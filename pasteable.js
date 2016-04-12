function pasteable(options){
	var cur_el = document.querySelector(options.selectElement),
	    SHADOW_COLOR = options.shadowColor || '#9dccfd',
	    SHADOW_WEIGHT = options.shadowWeight || '1',
	    SHADOW_BLUR = options.shadowBlur || 0,
      SHADOW = '0px 0px '+SHADOW_BLUR+'px '+SHADOW_WEIGHT+'px '+SHADOW_COLOR,
      clipboard = document.createElement('textarea');

	document.body.appendChild(clipboard);
	
	clipboard.style.position = 'absolute';
	clipboard.style.top = '-1000px';
	clipboard.style.left = '-1000px';
	                    
	cur_el.addEventListener('click', function(e) {
		clipboard.dispatchEvent(new Event('focus'));
		
		cur_el.dispatchEvent(new Event('focus'));
	});
	
	clipboard.addEventListener('blur', function(e) {
		cur_el.style['-moz-box-shadow'] = '';
		cur_el.style['-webkit-box-shadow'] = '';
		cur_el.style['box-shadow'] = '';
		cur_el.style.filter = "filter: progid:DXImageTransform.Microsoft.Glow(enabled=false, color='"+SHADOW_COLOR+"', Strength="+SHADOW_WEIGHT+");";
	});
	
	clipboard.addEventListener('focus', function(e) {
		clipboard.select();
		cur_el.style['-moz-box-shadow'] = SHADOW;
		cur_el.style['-webkit-box-shadow'] = SHADOW;
		cur_el.style['box-shadow'] = SHADOW;
		cur_el.style.filter = "filter: progid:DXImageTransform.Microsoft.Glow(enabled=true,color='"+SHADOW_COLOR+"', Strength="+SHADOW_WEIGHT+");";

	});
	
	clipboard.addEventListener('keydown', function(e) {
	  dispatchKeyboardEvent('keydown', e);
	});
	
	clipboard.addEventListener('keypress', function(e) {
	  dispatchKeyboardEvent('keypress', e);
	});
	
	function dispatchKeyboardEvent(type, e){
	  //Not working in Chrome
	  var key = e.key || String.fromCharCode(e.keyCode),
	      keyEvent = new KeyboardEvent(type, {target: cur_el,
	                                                altKey: e.altKey,
	                                                code: e.code,
	                                                ctrlKey: e.ctrlKey,
	                                                isComposing: e.isComposing,
	                                                key: key,
	                                                locale: e.locale,
	                                                location: e.location,
	                                                metaKey: e.metaKey,
	                                                repeat: e.repeat,
	                                                shiftKey: e.shiftKey});

	  cur_el.dispatchEvent(keyEvent);
	};
	
	clipboard.addEventListener('paste', function(e) {
		window.setTimeout(function() {
			cur_el.dispatchEvent(new CustomEvent('paste', {detail: clipboard.value}));
			clipboard.select();
		}, 0);
	});

	return cur_el;
}