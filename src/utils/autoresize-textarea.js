const autoResizeTextarea = (el) => {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
};

export default autoResizeTextarea;
