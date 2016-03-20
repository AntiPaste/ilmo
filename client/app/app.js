/* eslint-disable max-len */
// --  STYLES --
import './app.scss';


// --  SCRIPTS --
// jQuery first then Bootstrap
// import './static/js/jquery-2.1.4.min.js';
// import './static/js/tether.min.js';
// import './static/js/bootstrap.min.js';


// -- POLYFILLS --
import 'babel/polyfill';

// --  EXTERNAL LIBRARIES --
import { Dispatcher } from 'flux';
import React from 'react';
import ReactDOM from 'react-dom';
// pagejs is a router
import page from 'page';
// import query from './utils/query';


// --  UTILITIES --
import ApiUtils from './utils/ApiUtils';


// --  REACT & FLUX COMPONENTS, STORES AND ACTIONS --
import MessageStore from './stores/MessageStore';
import MessageActionCreators from './actions/MessageActionCreators';

import NotFoundView from './components/NotFoundView';

import EventsView from './components/EventsView';
import EventCreateView from './components/EventCreateView';
import EventView from './components/EventView';
import EventStore from './stores/EventStore';
import EventActionCreators from './actions/EventActionCreators';

import RegistrationView from './components/RegistrationView';
import RegistrationStore from './stores/RegistrationStore';
import RegistrationActionCreators from './actions/RegistrationActionCreators';


const apiBaseUrl = process.env.API_BASE_PATH;
const dispatcher = new Dispatcher();
const apiUtils = new ApiUtils(apiBaseUrl);

const messageStore = new MessageStore(dispatcher);
const eventStore = new EventStore(dispatcher);
const registrationStore = new RegistrationStore(dispatcher);

const messageActionCreators = new MessageActionCreators(dispatcher, apiUtils);
const eventActionCreators = new EventActionCreators(dispatcher, apiUtils);
const registrationActionCreators = new RegistrationActionCreators(dispatcher, apiUtils);


/* eslint-enable max-len */
// Log all dispatches when debugging is on.
if (process.env.DEBUG) {
  dispatcher.register((action) => {
    console.log('DISPATCHER', action);
  });
}

// -- ROUTES! --
page.base(process.env.APP_BASE_PATH);

// Middleware for clearing messages on page change
page((context, next) => {
  messageActionCreators.clearMessages();
  next();
});

const eventsViewRoute = () => {
  eventActionCreators.getEvents();

  const props = {
    eventStore,
    messageStore, messageActionCreators,
  };

  ReactDOM.render(
    <EventsView {...props} />,
    document.getElementById('ilmo-frontend')
  );
};

page('/', eventsViewRoute);
page('/events', eventsViewRoute);


page('/events/create', () => {
  const props = {
    eventStore, eventActionCreators,
    messageStore, messageActionCreators,
  };

  ReactDOM.render(
    <EventCreateView {...props} />,
    document.getElementById('ilmo-frontend')
  );
});


page('/events/:id', ({ params }) => {
  eventActionCreators.getEvent(params.id);
  registrationActionCreators.getEventRegistrations(params.id);

  const props = {
    eventID: params.id,
    messageStore, messageActionCreators,
    eventStore,
    registrationStore,
  };

  ReactDOM.render(
    <EventView {...props} />,
    document.getElementById('ilmo-frontend')
  );
});


page('/events/:id/register', ({ params }) => {
  eventActionCreators.getEvent(params.id);

  const props = {
    messageStore, messageActionCreators,
    eventStore,
    registrationStore, registrationActionCreators,
  };

  ReactDOM.render(
    <RegistrationView {...props} />,
    document.getElementById('ilmo-frontend')
  );
});


/* page('/package/:id', ({ params }) => {
  // Fetch/refresh view data
  rtActionCreators.getCurrentUser();
  packageActionCreators.getPackage(params.id);
  packageActionCreators.getPackageTree(params.id);
  packageActionCreators.getRights(params.id);
  logActionCreators.getPackageLog(params.id);

  const props = {
    rtStore, rtActionCreators,
    messageStore, messageActionCreators,
    packageStore, packageActionCreators,
    productStore, productActionCreators,
    logStore, logActionCreators,
  };

  ReactDOM.render(
    <IntlProvider {...locale}>
      <PackageInformationView {...props} />
    </IntlProvider>,
    document.getElementById('rakennustieto-client')
  );
}); */


page('*', () => {
  ReactDOM.render(
    <NotFoundView />,
    document.getElementById('ilmo-frontend')
  );
});


page.start();
