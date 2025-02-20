# Modules

The `modules` folder contains specialized compositions of primary components (usually found in the `components` folder) with additional business logic and functionality. These modules are:

- More complex than basic components
- Often combine multiple components together
- Include specific business logic or state management
- Highly specialized for particular use cases
- Generally less reusable across different contexts
- May have some level of customization, but focused on specific functionality

Think of modules as "feature blocks" that serve a particular purpose in your application. While components are like LEGO pieces, modules are like pre-built LEGO sets designed for specific scenarios.

Examples might include:
- AuthenticationModule (combining login form, validation, state management)
- ShoppingCartModule (product list, cart state, checkout flow)
- DashboardModule (various widgets, data fetching, layout management)

**Note:** Avoid creating modules that are too generic as they should serve a specific purpose. If you find yourself wanting to reuse a module across different contexts, consider breaking it down into more reusable components instead.