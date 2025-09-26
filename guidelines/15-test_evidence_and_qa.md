 # Guideline on test-evidence and quality assurance

 To ensure overall quality, consistency, and a positive user experience for the web component to be integrated into 
 the MyHealth application, test evidence must be provided by the supplier. This includes results from both functional 
 and non-functional tests. These results are to be delivered to the implementer of the web component, accompanied by 
 a detailed test report that demonstrates compliance and supports a positive recommendation for implementation in the
 production environment.

The format of the test report is flexible. You are encouraged to use your own structure, provided the following 
information is clearly included, as outlined further in this document.

> **Note**: We do not require specific details about the IT infrastructure used. However, please include high-level
information that confirms integration and performance tests. particularly non-functional tests have been conducted 
prior to delivery. Expectations are further explained below.

The required content of the test report may be subject to change based on evolving MyHealth Project needs. 
Any updates will be communicated to relevant suppliers as necessary.

## Test Report Template

**Supplier:** [Supplier Name]
**Component Name:** [Web Component Name]
**Version:** [Version Number]
**Test Execution Period:** [Start Date – End Date] (e.g., 01/04/2025 – 10/04/2025)
**Report Date:** [Date] (e.g., 10/04/2025)

### Introduction

Provide a brief overview of the component and the purpose of the test report.

### Objectives

List the objectives of the tests performed. A bullet list is acceptable.

#### Examples:

- Ensure the component meets functional quality standards
- Detect any defects related to functionality, usability, or performance
- Validate security and data integrity

_This list is not exhaustive and should be adapted based on the scope of your component._

### Test Scope

#### Included

Outline the functional areas and types of tests included. At a minimum, the following are expected:

- **Functional tests**, grouped per feature if possible
- **Performance tests**
- **Accessibility tests**, referencing WCAG 2.2 Level AA
- **Screen reader navigation** must be supported (e.g., VoiceOver for iOS, TalkBack for Android)

#### Excluded

Clearly mention any tests or areas that were intentionally excluded.

### Test Environment

Describe all test environments used. Be concise but specific.

#### Example:

- **Browser**: Chrome – Major version
- **Mobile**: Android – Device Model – OS Version

For browser tests, indicate how browser properties (e.g., viewport sizes) were configured to test responsiveness. 
No need to include hardware details, just high-level configuration relevant to integration.

### Testing Methodologies

List the testing methods used and their application.

#### Examples:

- Manual testing
- Automated testing (e.g., Postman for API testing, Selenium for regression)
- Security testing tools (specify if applicable)

### Test Results

Provide a breakdown of test results. Below is a sample format for critical test cases. 
Apply similar structure to others.

| Priority      | Total Cases | Passed | Failed | Blocked |Pass Rate |
| ---           | ---         | ---    | ---    | ---     | ---      |
| Critical (P1) |	57          | 47	   | 10     |	0	      | 100%     |
| High (P2)	    | --          |	--	   | --     |	--	    | ≥80%     |
| Medium (P3)	  | --          |	--	   | --     |	--	    | ≥60%     |
| Low (P4)	    | --          |	--	   | --     |	--	    | ≥30%     |

### Defect Summary

Summarize all defects found during testing.

| Severity | Description | Status |
| ---      | ---         | ---    |
| Critical / High / Medium / Low | [What is broken] |	Open / In Progress / Closed |

### Conclusion

Provide a brief conclusion based on the test results.

### Next Steps

Indicate any upcoming actions we need to be aware of, such as:
- Planned updates or new versions
- Expected timelines for fixing defects
- Other relevant follow-ups

### Prepared By

**Name:**
**Role:**
**Project:**
**Signature:**

### Quality Assurance Requirements

To ensure compatibility with the MyHealth integration standards, the following criteria must be met. 
A minimum score of **60% out of 74** is required for a positive recommendation.

| Requirement                         | Points |
| ---                                 | ---    |
| Mobile gestures supported	          | 10     |
| Input meets standards (mandatory)	  | 10     |
| Output meets standards (mandatory)	| 10     |
| Component documentation	            | 8      |
| Test evidence provided              | 8      |
| No internal navigation in component	| 6      |
| Integrator can apply custom styling	| 6      |
| Response time under 3 seconds	      | 10     |
| Clear, exposed error handling	      | 6      |

### Mobile Gestures Support

Web components must support mobile gestures to ensure a smooth user experience in the mobile application.  
See: [Mobile Gestures Supported in Mags-App](./10-mobile_gestures.md)

### Input & Output Standards

Input and output must comply with technical standards for integration. 
These are **mandatory** and must be fulfilled prior to integration.  
Reference: [inputs](./02-host_settings.md) and [outputs](./03-component_events.md)

### Component Documentation

Comprehensive documentation must be provided to support test evidence and assist integrators. This includes:
- Functional overview
- List and explanation of exposed errors

### No Internal Navigation
Components must not include any form of internal navigation. All navigation is handled externally.

#### Not allowed:

- Auto-scrolling
- Menus (e.g., top/bottom bars, tab layouts, hamburger menus)

#### Allowed:

- Inline navigation via buttons or links within the component

### Styling Support

Components must allow for styling by the integrator.  
Reference: [Styling guidelines](./09-ui_and_design-system.md)

### Response Time

Component actions must respond within **3 seconds** to ensure a smooth experience. This will be independently validated.

### Error Handling

Components must expose user-relevant errors clearly and consistently, allowing the integrator to present appropriate 
messages to end users. This must align with the provided documentation.
