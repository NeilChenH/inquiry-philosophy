(() => {
  'use strict';

  let enabled = false;
  let mounted = null;

  function underlineFor(tab) {
    const width = tab.offsetWidth;
    const inset = Math.min(12, width * .12);
    return {left: tab.offsetLeft + inset, width: width - 2 * inset};
  }

  function positionUnderline(state, fromTab) {
    const next = underlineFor(state.selected);
    if (!next.width) return;
    if (!fromTab && next.left === state.left && next.width === state.width) return;

    state.animation?.cancel();
    state.left = next.left;
    state.width = next.width;
    state.marker.style.width = `${next.width}px`;
    state.marker.style.transform = `translateX(${next.left}px)`;
    state.tabs.dataset.chapterTabMarker = '';

    if (!enabled || !fromTab || typeof state.marker.animate !== 'function') return;
    const start = underlineFor(fromTab);
    if (!start.width || (start.left === next.left && start.width === next.width)) return;
    state.animation = state.marker.animate([
      {transform: `translateX(${start.left}px) scaleX(${start.width / next.width})`},
      {transform: `translateX(${next.left}px) scaleX(1)`},
    ], {duration: 310, easing: 'cubic-bezier(.22,.65,.3,1)'});
  }

  function keepSelectedVisible(state) {
    const {tabs, selected} = state;
    const left = selected.offsetLeft;
    const right = left + selected.offsetWidth;
    const visibleRight = tabs.scrollLeft + tabs.clientWidth;
    if (left < tabs.scrollLeft) tabs.scrollLeft = left;
    else if (right > visibleRight) tabs.scrollLeft = right - tabs.clientWidth;
    state.scrollLeft = tabs.scrollLeft;
  }

  function sync(animate) {
    if (enabled === animate) return;
    enabled = animate;
    document.documentElement.classList.toggle('cinema-chapter-ready', enabled);
    if (!enabled) {
      mounted?.animation?.cancel();
      mounted?.panel?.classList.remove('chapter-tab-enter');
    }
  }

  function mount(main, {tabChanged = false} = {}) {
    const previous = mounted;
    if (previous) {
      previous.animation?.cancel();
      previous.observer?.disconnect();
      previous.tabs.removeEventListener('scroll', previous.rememberScroll);
      previous.marker.remove();
      delete previous.tabs.dataset.chapterTabMarker;
      previous.panel?.classList.remove('chapter-tab-enter');
    }
    mounted = null;
    const tabs = main?.querySelector('.chapter-tabs');
    const selected = tabs?.querySelector('[role="tab"][aria-selected="true"]');
    if (!selected) return;

    const marker = document.createElement('span');
    marker.className = 'chapter-tab-marker';
    marker.setAttribute('aria-hidden', 'true');
    tabs.append(marker);
    const panel = main.querySelector('.chapter-content');
    const state = {tabs, selected, marker, panel, scrollLeft: tabs.scrollLeft};
    mounted = state;

    // 标签页切换会重建导航栏，从新导航栏里重新测量上一个标签的位置。
    const fromTab = tabChanged && previous
      ? [...tabs.querySelectorAll('[role="tab"]')].find(tab => tab.id === previous.selected.id)
      : null;
    if (fromTab) tabs.scrollLeft = previous.scrollLeft;
    keepSelectedVisible(state);
    positionUnderline(state, fromTab);
    if (enabled && tabChanged) panel?.classList.add('chapter-tab-enter');

    state.rememberScroll = () => { state.scrollLeft = tabs.scrollLeft; };
    tabs.addEventListener('scroll', state.rememberScroll, {passive: true});
    if (typeof ResizeObserver === 'function') {
      state.observer = new ResizeObserver(() => {
        if (mounted !== state) return;
        positionUnderline(state);
        keepSelectedVisible(state);
      });
      state.observer.observe(tabs);
      for (const tab of tabs.querySelectorAll('[role="tab"]')) state.observer.observe(tab);
    }
  }

  window.addEventListener('resize', () => {
    if (!mounted) return;
    positionUnderline(mounted);
    keepSelectedVisible(mounted);
  }, {passive: true});
  window.inquiryChapter = {mount, sync};
})();
