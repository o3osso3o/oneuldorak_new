// Keep AI features in mock mode in every environment, including production.
// This tracked setting deliberately overrides local and deployment env values.
export function shouldUseMockAi() {
  return true
}
