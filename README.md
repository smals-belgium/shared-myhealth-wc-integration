# MyHealth - Web Component Integration

This module defines the types used to describe the inputs and outputs exposed by the MyHealth Web Components.

It also provides a web component documentation template (markdown) at: 
[README-component.template.md](README-component.template.md).

This library is published to the NPM registry at: 
[https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration](https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration)


## Documentation

See [Guidelines](./guidelines/00-guidelines.md)

Note that the types used in this library are also thoroughly documented,
so if you prefer to dig in through the code, that's also an option.

In that case your best starting point is [MyHealthModule](./src/module/module.ts).  
Everything else builds up from there.

## Example web component module

Example of one web component module with multiple components that work together.  
It uses the [pre-fetch](./guidelines/06-data_pre-fetching_vs_refreshing.md) to load data before any component
is displayed, and stores the data in the "cache service" provided by the host application.

```ts
import {
  MyHealthModuleBootstrap,
  family,
  MyHealthModuleManifest,
  openEventType
} from '@smals-belgium/myhealth-wc-integration';

import { hostServices } from './host';
import { getEmployees } from './employee.api';
import { EmployeeList } from './view/employee-list';
import { EmployeeDetail } from './view/employee-detail';


const tag = {
  list: 'wc-employee-list',
  detail: 'wc-employee-detail'
};

export const manifest: MyHealthModuleManifest = {
  specVersion: { major: 5, minor: 0, patch: 0 },
  family: family('wc-employees'),
  components: [{
    tagName: tag.list,
    events: [openEventType, refreshEventType],
  }, {
    tagName: tag.detail,
    requiredInputs: ['userId'],
    events: [refreshEventType],
  }]
};


export const bootstrap: MyHealthModuleBootstrap = ({ services }) => {
  Object.assign(hostServices, services);

  customElements.define(tag.list, EmployeeList);
  customElements.define(tag.detail, EmployeeDetail);

  return () => getEmployees()
    .then(employees => hostServices.cacheDataStorage.set('employees', employees));
}
```
