# Demo mode implementation

Demo Mode provides a self-contained environment for web components, eliminating the need for external API calls.

When creating web components, follow these guidelines to ensure proper Demo Mode functionality:

## Static Data Integration

- Include fallback static data within each component.
- Configure components to reference internal data when operating in Demo Mode.
- Use representative sample data that demonstrates all component states.
- Provide the demo data in 4 languages: NL, FR, DE, EN

## Configuration Detection

- Components must provide the configName input parameter.
- Activate Demo Mode when `configName === "demo"`.

## API Call Handling

- Intercept all API calls when in Demo Mode.
- Return predefined responses instead of making actual network requests.

## Authentication Bypass

- Accept basic credential login in Demo Mode (e.g., username: "John Doe").
- Skip token validation and OAuth processes.
- Simulate authorization states locally.

## Testing Requirements

- Ensure all components function fully in Demo Mode.
- Render all possible states using demo data.
- Include edge cases and error states in demo scenarios.
