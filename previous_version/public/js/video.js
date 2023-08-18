// Download Buttons
const downloadBtn = document.querySelectorAll('button[data-filename]')

downloadBtn.forEach(btn => {
    btn.addEventListener('click', ()=>{
        btn.setAttribute('disabled', true)
        download(btn.dataset.src, btn.dataset.filename)
        .then(()=>{
            console.log(`Success download ${btn.dataset.filename}`)
            btn.removeAttribute('disabled')
        })
        .catch(()=> console.error(`Failed to download ${btn.dataset.filename}`))
    })
})