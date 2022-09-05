const autoResizeTextarea = (el: Element | HTMLTextAreaElement) => {
  if (el instanceof HTMLTextAreaElement) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }
};

export default autoResizeTextarea;
