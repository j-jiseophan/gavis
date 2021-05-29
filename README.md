# Gavis

[![npm version](https://badge.fury.io/js/gavis.svg)](https://badge.fury.io/js/gavis)

Declarative analytics logging library for React

See [Docs](https://j-jiseophan.github.io/gavis-docs).

## Installation

```bash
npm i --save gavis
```

or using yarn,

```bash
yarn add gavis
```

## Examples

```tsx
//App.tsx

import { GavisConfig } from "gavis";

const logger = (category: string, action: string, label: string, data: any) => {
  const value = data.viewCount;
  ga(category, action, label, value);
};

function App() {
  return (
    <GavisConfig logger={logger}>
      <Page />
    </GavisConfig>
  );
}

//Page.tsx

import { Gavis } from "gavis";

/*
  - Create a log event context with <Gavis/> .
  - If 'logOnMount' is true, event
    {cateogry: "News", action:"expose", label:"morning",
      data: { viewCount, commentCount }} is sent on mount
*/

function Page() {
  return (
    <div>
      <p>hello world</p>

      <Gavis
        category="News"
        action="expose"
        label="morning"
        data={{ viewCount, commentCount }}
        logOnMount
      >
        <div>message</div>
        <Button />
      </Gavis>
    </div>
  );
}

// Button.tsx

import { useGavis } from "gavis";

/*
  - The event context can be overriden
    by child <Gavis/> or 'log' function
  - Event {cateogry: "News", action:"click", label:"evening",
            data: { viewCount, commentCount }} is sent on click
*/

function Button() {
  const log = useGavis();
  return (
    <Gavis label="evening">
      <button onClick={() => log({ action: "click" })}>LOG</button>;
    </Gavis>
  );
}
```
