# PERSONAL WEBSITE

## SETUP DEV

```bash
https://github.com/yudhaginongpratidina/personal-website.git
cd personal-website
cp .env.example .env
pnpm install
```

```env
NEXT_PUBLIC_ENVIRONMENT=
NEXT_PUBLIC_BACKEND=
```

## SETUP PROD

```bash
https://github.com/yudhaginongpratidina/personal-website.git
cd personal-website
cp .env.example .env
```

```bash
cp .env.example .env
```

```bash
docker build -t nextjs/personal-website:latest .
docker run -d --name personal-website -p <port>:5010 nextjs/personal-website:latest
```