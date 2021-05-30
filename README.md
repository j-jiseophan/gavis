# Gavis

[![npm version](https://badge.fury.io/js/gavis.svg)](https://badge.fury.io/js/gavis)

Declarative analytics logging library for React

See [Docs](https://j-jiseophan.github.io/gavis-docs).

# Introduction

`Gavis - A declarative analytics logging library for React`

Writing code for analytics logging is so boring and stressful. I wanted not to spend much time on writing codes related to logging but to focus on the application itself.

Gavis is an analytics logging library which helps you ..

1. Send logs in declarative ways
2. Get data needed for logging with less code
3. Prevent sending duplicate logs for a single event
4. Testing easily

## Overview

```jsx
// without Gavis
const Page = () => {
  useEffect(() => {
    sendLog({ category: "Post", action: "view" });
  }, [sendLog]);

  return <div>Hello World</div>;
};
```

Can be rewritten using Gavis :

```jsx
// with Gavis
const Page = () => {
  return (
    <Gavis category="Post" action="view" logOnMount>
      <div>Hello World</div>
    </Gavis>
  );
};
```

## Installation

```bash
yarn add gavis
```

## Contributing

You can test Gavis with `jest` or in the playground application.

```bash
yarn test
```

```bash
yarn playground
```
