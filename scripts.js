// Lightweight tab behavior for all pages.
// - Uses data-tab attributes on buttons and id on panels
// - Supports keyboard navigation (ArrowLeft/ArrowRight)
// - Reads ?tab=panelName in URL to open specific tab if present

(function(){
  function initTabs(root){
    const tabs = Array.from(root.querySelectorAll('.tab'));
    if(!tabs.length) return;
    const panels = Array.from(root.querySelectorAll('.panel'));
    function selectTab(tab){
      // deselect all
      tabs.forEach(t=>{
        t.setAttribute('aria-selected','false');
      });
      panels.forEach(p=>{
        p.setAttribute('aria-hidden','true');
        p.hidden = true;
      });
      // select this one
      tab.setAttribute('aria-selected','true');
      const id = tab.dataset.tab;
      const panel = root.querySelector(`#${id}`);
      if(panel){
        panel.setAttribute('aria-hidden','false');
        panel.hidden = false;
      }
      // update hash-free query param for direct links
      try{
        const url = new URL(window.location.href);
        url.searchParams.set('tab', id);
        window.history.replaceState({}, '', url.toString());
      }catch(e){}
    }

    tabs.forEach((tab, idx)=>{
      tab.addEventListener('click', ()=> selectTab(tab));
      tab.addEventListener('keydown', (ev)=>{
        if(ev.key === 'ArrowRight'){
          ev.preventDefault();
          const next = tabs[(idx+1)%tabs.length];
          next.focus();
          selectTab(next);
        } else if(ev.key === 'ArrowLeft'){
          ev.preventDefault();
          const prev = tabs[(idx-1+tabs.length)%tabs.length];
          prev.focus();
          selectTab(prev);
        }
      });
    });

    // deep link: ?tab=name
    try{
      const params = new URL(window.location.href).searchParams;
      const requested = params.get('tab');
      if(requested){
        const match = tabs.find(t => t.dataset.tab === requested);
        if(match) { selectTab(match); return; }
      }
    }catch(e){}

    // default: open first tab
    selectTab(tabs[0]);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    // initialize all .tabs containers (one per page main area)
    const root = document;
    initTabs(root);

    const btn = document.getElementById("dropdownBtn");
    const menu = document.getElementById("dropdownMenu");
    const arrow = btn.querySelector(".arrow");
  });
})();