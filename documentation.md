## Set up new project and git
```
vue create weather-ahead-vue2
cd weather-ahead-vue2

git init
git remote add origin https://github.com/mseewaters/weather-ahead.git
git pull origin main
git add .
git commit -m "Initial commit"
git push --set-upstream origin main

set up new repository via AWS Amplify

```

## Add linter rules
```
rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'operator-linebreak': 0
  }

```

## Useful sites
https://iconscout.com/