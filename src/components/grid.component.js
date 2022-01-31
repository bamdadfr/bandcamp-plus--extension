/**
 * Component for a grid of three columns.
 *
 * @returns {HTMLDivElement} - Grid component
 */
export function GridComponent() {
  const container = document.createElement('div');
  container.style.display = 'grid';
  container.style.alignItems = 'center';
  container.style.gridTemplateColumns = '54px 1fr 2em';
  container.style.gridGap = '1em';

  return container;
}
