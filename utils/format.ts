export function numberToWordsFR(number: number): string {
  // A simple implementation for common invoice amounts in FCFA.
  // In a real-world app, you'd use a library like 'written-number' or a robust custom function.
  // This is a simplified placeholder that handles basic conversions or requires a library.
  
  // For the sake of this prompt, let's use a very basic logic or just rely on a library if needed.
  // To avoid complex implementation right now, let's just return a placeholder or a simple formatter.
  
  // Actually, I'll provide a somewhat working function for thousands and millions.
  const units = ['', 'Un', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept', 'Huit', 'Neuf', 'Dix', 'Onze', 'Douze', 'Treize', 'Quatorze', 'Quinze', 'Seize', 'Dix-Sept', 'Dix-Huit', 'Dix-Neuf'];
  const tens = ['', '', 'Vingt', 'Trente', 'Quarante', 'Cinquante', 'Soixante', 'Soixante-Dix', 'Quatre-Vingt', 'Quatre-Vingt-Dix'];

  if (number === 0) return 'Zéro';

  function convertGroup(n: number): string {
    let str = '';
    const h = Math.floor(n / 100);
    const rest = n % 100;
    
    if (h > 0) {
      if (h === 1) str += 'Cent ';
      else str += units[h] + ' Cent ';
    }
    
    if (rest > 0) {
      if (rest < 20) {
        str += units[rest] + ' ';
      } else {
        const t = Math.floor(rest / 10);
        const u = rest % 10;
        
        if (t === 7 || t === 9) {
          str += tens[t - 1] + '-' + units[u + 10] + ' ';
        } else {
          str += tens[t] + (u > 0 ? (u === 1 ? ' et Un ' : '-' + units[u] + ' ') : ' ');
        }
      }
    }
    return str;
  }

  let result = '';
  const millions = Math.floor(number / 1000000);
  const thousands = Math.floor((number % 1000000) / 1000);
  const remainder = number % 1000;

  if (millions > 0) {
    result += convertGroup(millions) + (millions === 1 ? 'Million ' : 'Millions ');
  }
  
  if (thousands > 0) {
    if (thousands === 1) {
      result += 'Mille ';
    } else {
      result += convertGroup(thousands) + 'Mille ';
    }
  }
  
  if (remainder > 0) {
    result += convertGroup(remainder);
  }

  return result.trim().replace(/ +/g, ' ');
}

export function formatCurrency(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
