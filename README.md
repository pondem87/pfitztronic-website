# Pfitztronic website

The Pfitztronic website is an Astro static site that produces separate builds for:

- `https://pfitztronic.co.bw`
- `https://pfitztronic.co.zw`

The existing `.html` URLs are retained. Source page content lives in `src/content/pages`, while Astro adds domain-specific canonical URLs, alternate-domain metadata, sitemap and robots output, and contact details during each build.

## Local development

Astro 7 requires a current Node.js release; the deployment workflow uses Node.js 24. Install dependencies and start the Botswana site by default:

```sh
npm install
npm run dev
```

Run either country during development:

```sh
npm run dev:bw
npm run dev:zw
```

Build both production artifacts:

```sh
npm run build:all
```

The output directories are `dist/bw` and `dist/zw`.

## Country configuration

Each country has one explicit, committed configuration file:

- `.env.bw` for Botswana
- `.env.zw` for Zimbabwe

Both files define the complete site configuration: country, domain and origin, locale and alternate-domain metadata, output directory, address, telephone, email, map URL, Google Analytics property ID, contact-form endpoint, and social links. Builds fail immediately when a required value is missing or an absolute URL is invalid.

`npm run build:bw` reads only `.env.bw`; `npm run build:zw` reads only `.env.zw`. The GitHub Actions workflow uses these same files, making local and deployment builds consistent.

## GitHub Actions deployment

The workflow builds both sites, syncs each artifact to its own S3 bucket, and invalidates its CloudFront distribution after pushes to `main` or a manual run.

Configure these GitHub Actions secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

The deployed resources are configured in `.github/workflows/main.yaml` from the Terraform outputs:

| Site | Website URL | S3 bucket | CloudFront domain | Distribution ID |
| --- | --- | --- | --- | --- |
| Botswana | `https://pfitztronic.co.bw` | `pfitztronic.co.bw` | `d1dh5jphhrgky1.cloudfront.net` | `E2IHQHKBAWD0GN` |
| Zimbabwe | `https://pfitztronic.co.zw` | `pfitztronic.co.zw` | `d1mn7i26mto6c0.cloudfront.net` | `E1NIKM2EN50E34` |

`AWS_REGION` is an optional repository variable and defaults to `af-south-1`.

For stronger AWS security, the workflow can later be changed to GitHub OIDC and an IAM role instead of long-lived access keys.
