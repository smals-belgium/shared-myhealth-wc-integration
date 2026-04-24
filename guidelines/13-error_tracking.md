# Guidelines on error tracking

Each web component is responsible for:
- Catching and handling all errors within the scope of the component itself
- Tracking errors using an error monitoring tool
- Displaying user-facing errors only when they directly impact the user's ability to use the component

You can find the design of the error alert in the figma design guide.

In addition, the component must **document its internal logging system** as part of its quality criteria, 
ensuring that issues can be traced and understood.

This document defines the approach for error tracking across distributed web components while maintaining flexibility 
for individual teams to implement error tracking appropriate to their specific needs.

## Who tracks errors

Each web component **must** implement its own error tracking. Error tracking is **mandatory** and must
be operational before a component is released to production.

Teams are free to choose their own error tracking tool and are not required to use Sentry, although
they may opt to do so if it fits their needs.

## Error Containment

Each web component must implement a global error boundary or top-level handler to catch all unhandled
errors and promise rejections within the scope of the component itself. Errors must not propagate to the host application,
as this risks exposing unsanitized data to external monitoring tools used by the host application.

## Displaying errors to users

A component must display an error to the user only when the error directly impacts the user's ability
to use the component. Errors that are handled transparently and do not affect the user experience
must not trigger a user-facing message.

When a user-facing error is displayed, the component must provide a **retry button** to allow users to
attempt recovery.

## Data to Include in Error Tracking

### Essential Error Information

- **Error type/classification**: Include the specific exception type or error code
- **Error message**: The complete error message with relevant details
- **Stack trace**: Full stack trace to pinpoint the exact location of the error
- **Timestamp**: When the error occurred (with timezone information)

### Contextual Information

- **Method/function name**: Where the error occurred
- **Input parameters**: Sanitized representation of the inputs that led to the error
- **Application state**: Relevant application state at the time of error
- **Environment information**: Development, staging, production, etc.
- **User action**: What action was being performed when the error occurred
- **Previous operations**: Recent operations that might have contributed to the error

### System Information

- **Service name and version**: Identify the specific service and its version
- **Host information**: OS, OS version, device brand... 

## Data to Exclude from Error Tracking

### Sensitive Information

- **Personally Identifiable Information**: Names, addresses, phone numbers, etc.
- **Authentication data**: Passwords, tokens, session IDs
- **Health information**: Any data related to health status or medical conditions
- **Unique identifiers**: Social security numbers, national IDs, etc.

### Security-Related Information

- **Internal network details**: IP addresses, hostnames, URLs with credentials
- **Database connection strings**: With credentials or sensitive configuration
- **Encryption keys**: Any type of encryption or signing keys
- **System paths**: Full directory paths that reveal system architecture

### Performance Considerations

- **Large data objects**: Avoid logging entire large objects or datasets
- **Binary data**: Don't include binary data directly in error tracking
- **Redundant information**: Avoid duplicate data across different error fields

## Implementation Best Practices

1. **Implement consistent error handling** across all components
2. **Use structured logging** with appropriate log levels
3. **Categorize errors** for easier filtering and analysis
4. **Sanitize sensitive data** before storing or transmitting
5. **Implement sampling** for high-volume error scenarios
6. **Add context incrementally** as it passes through layers of the application
7. **Use correlation IDs** to track request flow through multiple components
8. **Consider rate limiting** for error reporting to prevent flooding

## Error Severity Levels

- **Critical**: Application/component is completely non-functional
- **Error**: Significant functionality is impaired
- **Warning**: Non-critical issues that might lead to errors
- **Info**: Important events that aren't errors but provide context
