export function observeElement(
  element: HTMLElement,
  callback: (changes: MutationRecord[]) => void,
): MutationObserver {
  const observer = new MutationObserver(callback);
  observer.observe(element, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  });
  return observer;
}
