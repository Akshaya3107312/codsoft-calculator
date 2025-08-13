(function(){
  const display = document.getElementById('display');
  const keys = document.querySelector('.keys');

  function isOperator(ch){ return ['+','-','*','/'].includes(ch); }

  function append(val){
    const cur = display.value;
    if(val === '.'){
      // Prevent two decimals in the current number chunk
      const parts = cur.split(/([+\-*/])/);
      const last = parts[parts.length-1] || '';
      if(last.includes('.')) return;
    }
    if(isOperator(val)){
      if(cur === '' && val !== '-') return; // don't start with operator except minus
      if(isOperator(cur.slice(-1))) return; // avoid consecutive operators
    }
    display.value += val;
  }

  function clearAll(){ display.value = ''; }
  function del(){ display.value = display.value.slice(0, -1); }
  function equals(){
    if(!display.value) return;
    try{
      const result = Function('return (' + display.value + ')')();
      if(result === Infinity || Number.isNaN(result)) throw new Error('Bad');
      display.value = String(result);
    }catch(e){
      alert('Invalid expression');
    }
  }

  keys.addEventListener('click', (e)=>{
    const btn = e.target.closest('button'); if(!btn) return;
    const v = btn.getAttribute('data-value');
    const act = btn.getAttribute('data-action');
    if(v != null){ append(v); }
    else if(act === 'clear'){ clearAll(); }
    else if(act === 'delete'){ del(); }
    else if(act === 'equals'){ equals(); }
  });

  // Keyboard support
  window.addEventListener('keydown', (e)=>{
    if(/[0-9]/.test(e.key)) append(e.key);
    else if(['+','-','*','/','.'].includes(e.key)) append(e.key);
    else if(e.key === 'Enter') { e.preventDefault(); equals(); }
    else if(e.key === 'Backspace') del();
    else if(e.key === 'Escape') clearAll();
  });
})();