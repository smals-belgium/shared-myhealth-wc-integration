# Guideline for documentation

Each web component must be properly documented.  
This documentation must include the following information:

- Tag name associated with that component
- Description of what the component does
- Component family name (e.g. "Vidis Prescriptions")
- List of all outputs that the component exposes. Each output must indicate:
  - name of the event
  - optional parameters
  - description of that output, when it's being fired, etc.
- List of all the services that will be required by the component, such as Location or Calendar services.

The [README-component.template.md](../README-component.template.md) file gives a Markdown template to document your 
components.
