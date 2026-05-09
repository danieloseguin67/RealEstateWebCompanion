const k='RealEstate2026Secret';
const xor=(t,key)=>[...t].map((c,i)=>String.fromCharCode(c.charCodeAt(0)^key.charCodeAt(i%key.length))).join('');
const dec=e=>xor(Buffer.from(e,'base64').toString('binary'),k);
console.log('jane:',JSON.stringify(dec('HwYRCh4dOC4oVwQLJQ==')));
console.log('daniel:',JSON.stringify(dec('FgQLASAHRlFGRw==')));
console.log('jessica:',JSON.stringify(dec('NC03ODBFLi0eJw==')));
