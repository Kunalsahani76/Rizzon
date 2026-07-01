#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BACKUP_DIR = './pdf-backup';
const PDF_DIR = './public/datasheet-pdf';

function showStatus() {
    console.log('📄 PDF Management Status\n');
    
    // Check backup directory
    if (fs.existsSync(BACKUP_DIR)) {
        const backupFiles = fs.readdirSync(BACKUP_DIR).filter(f => f.endsWith('.pdf'));
        console.log(`📁 Backup Directory: ${backupFiles.length} files`);
        backupFiles.forEach(file => {
            const stats = fs.statSync(path.join(BACKUP_DIR, file));
            const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
            const model = file.match(/NAV-[A-Z0-9-]+/)?.[0] || 'Unknown';
            console.log(`   • ${model}: ${sizeMB} MB`);
        });
    } else {
        console.log('📁 Backup Directory: Not found');
    }
    
    // Check main PDF directory
    const pdfFiles = fs.readdirSync(PDF_DIR).filter(f => f.endsWith('.pdf'));
    console.log(`\n📂 Main PDF Directory: ${pdfFiles.length} files`);
    
    let totalSize = 0;
    pdfFiles.forEach(file => {
        const stats = fs.statSync(path.join(PDF_DIR, file));
        totalSize += stats.size;
    });
    
    console.log(`   Total Size: ${(totalSize / (1024 * 1024)).toFixed(1)} MB`);
    
    if (fs.existsSync(BACKUP_DIR)) {
        const backupSize = fs.readdirSync(BACKUP_DIR)
            .filter(f => f.endsWith('.pdf'))
            .reduce((total, file) => {
                const stats = fs.statSync(path.join(BACKUP_DIR, file));
                return total + stats.size;
            }, 0);
        
        console.log(`\n📊 Combined Total: ${((totalSize + backupSize) / (1024 * 1024)).toFixed(1)} MB`);
        console.log(`📈 If all PDFs were restored: ${((totalSize + backupSize) / (1024 * 1024)).toFixed(1)} MB`);
    }
}

function listMissingPDFs() {
    console.log('\n🔍 Checking for missing PDFs in API...\n');
    
    const temporarilyUnavailable = [
        'NAV-I-10R4S', 'NAV-I-8P2S', 'NAV-I-8R2S', 'NAV-D24R4S', 'NAV-1000'
    ];
    
    temporarilyUnavailable.forEach(model => {
        const regularPath = path.join(PDF_DIR, `_Rizonn  Datasheet  ${model}.pdf`);
        const accessPointPath = path.join(PDF_DIR, `Rizonn  Datasheet  ${model}.pdf`);
        const backupRegularPath = path.join(BACKUP_DIR, `_Rizonn  Datasheet  ${model}.pdf`);
        const backupAccessPointPath = path.join(BACKUP_DIR, `Rizonn  Datasheet  ${model}.pdf`);
        
        const inMain = fs.existsSync(regularPath) || fs.existsSync(accessPointPath);
        const inBackup = fs.existsSync(backupRegularPath) || fs.existsSync(backupAccessPointPath);
        
        if (inMain) {
            console.log(`✅ ${model}: Available in main directory`);
        } else if (inBackup) {
            console.log(`⏳ ${model}: In backup (temporarily unavailable)`);
        } else {
            console.log(`❌ ${model}: Missing completely`);
        }
    });
}

function showRecommendations() {
    console.log('\n💡 Recommendations:\n');
    
    if (fs.existsSync(BACKUP_DIR)) {
        console.log('🎯 Next Steps:');
        console.log('1. Optimize PDFs in pdf-backup/ using online tools');
        console.log('2. Target: Reduce each file to under 5MB');
        console.log('3. Move optimized files back to public/datasheet-pdf/');
        console.log('4. Test download functionality');
        console.log('5. Remove pdf-backup/ folder when done');
        
        console.log('\n🔗 Recommended Tools:');
        console.log('• https://www.ilovepdf.com/compress_pdf');
        console.log('• https://smallpdf.com/compress-pdf');
        console.log('• https://tools.pdf24.org/en/compress-pdf');
        
        console.log('\n⚠️  Important:');
        console.log('• pdf-backup/ is now in .gitignore (won\'t be committed)');
        console.log('• Keep this folder until optimization is complete');
        console.log('• Always test PDF quality after compression');
    } else {
        console.log('✅ No backup directory found - all PDFs are in main directory');
    }
}

// Main execution
const command = process.argv[2];

switch (command) {
    case 'status':
        showStatus();
        break;
    case 'missing':
        listMissingPDFs();
        break;
    case 'help':
        console.log('📄 PDF Management Commands:');
        console.log('  node manage-pdfs.js status   - Show current PDF status');
        console.log('  node manage-pdfs.js missing  - Check for missing PDFs');
        console.log('  node manage-pdfs.js help     - Show this help');
        break;
    default:
        showStatus();
        listMissingPDFs();
        showRecommendations();
}