## NextJs

components inside app/ default to server side, outside app/ default to client side

## Supabase

https://supabase.com/docs/guides/auth/server-side/nextjs

## lint-staged

`npx lint-staged` - test locally without commiting

## Material-UI

Use `(theme) => theme.zIndex.drawer` rather than importing from useTheme() to avoid importing hook. Both still need to be client side. Use `borderColor: 'success.main'` for server side
