---
title: "Markdown Rendering Test"
date: 2026-03-21
description: "A test post exercising every supported markdown feature"
tags: ["test", "markdown"]
draft: true
---

## Inline Code

Use `console.log("hello")` to print. The `useState` hook returns a pair. Configure via `next.config.js`. Backticks around `short` and `longer code expressions like arr.map(x => x * 2)` should both look good.

Mix inline code with prose: run `npm install`, then edit `package.json`, and finally `npm run build` to verify.

## Code Blocks

```js
function greet(name) {
  console.log(`Hello, ${name}!`)
  return { greeting: `Hello, ${name}!` }
}
```

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

```bash
#!/bin/bash
for file in *.md; do
  echo "Processing $file"
  wc -w "$file"
done
```

```json
{
  "name": "bosabosa",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev -p 8000",
    "build": "next build"
  }
}
```

```css
.shiki code {
  font-family: ui-monospace, monospace;
  font-size: 14px;
  line-height: 1.6;
}
```

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, playground!")
}
```

```rust
fn main() {
    let numbers: Vec<i32> = (1..=10).collect();
    let sum: i32 = numbers.iter().sum();
    println!("Sum of 1..10 = {}", sum);
}
```

```
Plain code block with no language tag.
Just monospace text.
```

## Headings

### Third Level

#### Fourth Level

##### Fifth Level

###### Sixth Level

## Text Formatting

This is **bold text** and this is _italic text_ and this is **_bold italic_**. Here is ~~strikethrough text~~ from GFM.

## Links

An [inline link](https://example.com) and a [visited-style link](https://bosabosa.org). Links should be primary colored and underline on hover.

## Blockquotes

> This is a blockquote. It should have a left border, italic styling, and gray text color.
>
> It can span multiple paragraphs.

## Lists

Ordered:

1. First item
2. Second item
3. Third item with `inline code`

Unordered:

- Apples
- Bananas
- Cherries

Nested:

1. Outer item
   - Nested bullet
   - Another nested bullet
2. Back to outer

## Task Lists (GFM)

- [ ] Unchecked task
- [x] Completed task
- [ ] Another pending task

## Tables (GFM)

| Feature | Status | Notes |
|---------|--------|-------|
| Headings | Done | h1-h6 styled |
| Links | Done | primary color |
| Code | Done | mono + muted bg |
| Tables | Done | borders + padding |

## Horizontal Rule

Above the rule.

---

Below the rule.

## Images

Images would render with `max-width: 100%` but none are included in this test.
