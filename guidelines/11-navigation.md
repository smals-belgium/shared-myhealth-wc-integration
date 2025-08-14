# Guideline on navigation

_Note: by navigation, here, we mean anything related to  browser url, location or history, not to internal component 
state changes such as switching between tabs within a web component._

## Principle

Navigation between Web Components of the same `family` is **controlled entirely by the host application**, using their
own routing logic and URL structure. Web Components **must not** perform in-app navigation themselves.

Instead, when a web component family needs to trigger a transition (e.g., from an overview WC to a detail WC ), 
it must **emit an event** that the host listens for. The host is responsible for interpreting the event and responding
by updating the application state or loading the appropriate Web Component. 

### Why this matters:

Different host applications may want different navigation behaviors based on context or platform. For example, on 
mobile, selecting an item might navigate to a detail screen, while on desktop, the same interaction might display the
detail view alongside the overview. This flexibility is only possible if the host controls navigation.  
For more details: https://confluence.smals.be/x/EqHuFQ

### Passing Parameters

The event emitted by the Web Component can include any required **parameters**, such as an ID, in its payload. 
This allows the host to construct the appropriate navigation path or state.

## Example use case:

Vanilla web component:
```js
export class MedicationOverviewComponent {
  onButtonClick(id: string): void {
    this.dispatchEvent(new CustomEvent('selectMedication', { id }));
  }
}
```

equivalent in Angular:
```ts
export class MedicationOverviewComponent {

  readonly selectMedication = output<string>();

  onButtonClick(id: string): void {
    this.selectMedication.emit(id);
  }

}
```
