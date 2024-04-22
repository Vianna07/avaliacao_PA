export function getUnitName(unitCode) {
    return { "°C": "metric", "°F": "imperial" }[unitCode]
}