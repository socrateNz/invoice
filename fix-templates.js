const fs = require('fs');
const path = require('path');

const dir = 'components/templates';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    let p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    
    // Fix `<> ... </div>\n        )}` to `<> ... </div>\n        </>)}`
    // Wait, first let's just fix the ending conditionals.
    // There are two conditionals: {data.isFirstPage && (<> ... </>)} and {data.isLastPage && (<> ... </>)}

    // 1. Fix missing closing brackets for isFirstPage: 
    // It usually ends right before `{/* Subject */}` or `{/* Items Table */}` or `</div>\n        {/* Items Table */}`
    // Since each template is different, let's just do text replacements of the exact errors.
    
    // Replace incorrectly placed `)}`
    content = content.replace(/<\/div>\n\s*\)}/g, '</div>\n        </>)}');
    content = content.replace(/<\/div>\n\s*<\/>\}/g, '</div>\n        </>)}');
    
    content = content.replace(/<\/>\}/g, '</>)}');

    // Remove double semicolons from user typo
    content = content.replace(/\);\s*;/g, ');');

    fs.writeFileSync(p, content);
    console.log(`Patched ${file}`);
  }
});
