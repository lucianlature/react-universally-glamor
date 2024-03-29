/* @flow */

import React from 'react';
import { Match, Miss } from 'react-router';
import Helmet from 'react-helmet';
import { CodeSplit } from 'code-split-component';
import { css } from 'glamor';
import 'glamor/reset';
import Error404 from './Error404';
import Header from './Header';
import htmlPageConfig from '../../../../config/public/htmlPage';

css.insert(`
  html {
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Inline our ul for our menu */
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  ul li { display: inline; margin: 0 .5rem; }
`);

function App() {
  return (
    <div style={{ padding: '10px' }}>
      {/*
        All of the following will be injected into our page header.
        @see https://github.com/nfl/react-helmet
      */}
      <Helmet
        htmlAttributes={htmlPageConfig.htmlAttributes}
        titleTemplate={htmlPageConfig.titleTemplate}
        defaultTitle={htmlPageConfig.defaultTitle}
        meta={htmlPageConfig.meta}
        link={htmlPageConfig.links}
        script={htmlPageConfig.scripts}
      />

      <Header />

      <Match
        exactly
        pattern="/"
        render={routerProps =>
          <CodeSplit chunkName="home" modules={{ Home: require('./Home') }}>
            { ({ Home }) => Home && <Home {...routerProps} /> }
          </CodeSplit>
        }
      />

      <Match
        pattern="/about"
        render={routerProps =>
          <CodeSplit chunkName="about" modules={{ About: require('./About') }}>
            { ({ About }) => About && <About {...routerProps} /> }
          </CodeSplit>
        }
      />

      <Miss component={Error404} />
    </div>
  );
}

export default App;
