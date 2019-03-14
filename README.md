![](./docs/tmp_header.svg)

# Single File Component Loader

Abitious project that lets you read `.vue` files and transpile them to `React`, `Vue` and `WebComponents`.

# WHY??

For 2 reasons:

1. Philosophy
2. Design Systems

In short:

## Philosophy

`.vue` files seem to be a major factor for people to adopt Vue.js. Especially for juniors
the file format appears to be quite easy to use. Other than that, sorry, Vue and React are
not really that much different. Their concepts are basically the same thing.

So `.vue`, to me, is just a file format. It's not something that can only be done by Vue.
It is a file format for the paradigm of our times: Writing and orchestrating components.
Why should the way we write them not be a choice and something we can actively think about
and design for ourselves.

So I am trying to write a Webpack loader that is mostly compatible to Vue.js single file
components and that transpiles to other frameworks like React or Stencil. I'd call those
`.sfc` files.

## Design Systems

When you create a design system and implement components for it you end up locked in the
framework of your choice. This library should let you write components in a file format and
transpile them to multiple frameworks.

# Status

wip of course, but I have some success.

I can create simple ES5 React files from Vue compoents. Right now I am refactoring and
extending feature compatibility.
