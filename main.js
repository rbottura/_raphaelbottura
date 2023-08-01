window.addEventListener('load', () => {

    // Get the User-Agent header value
    const userAgent = navigator.userAgent;

    // Define regular expressions for common smartphone and tablet user agents
    const smartphoneRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const tabletRegex = /iPad|Android|Tablet|Kindle|PlayBook/i;

    // Check if the User-Agent matches a smartphone or tablet
    let isSmartphone = smartphoneRegex.test(userAgent);
    let isTablet = tabletRegex.test(userAgent) && !isSmartphone; // Avoid false positives with tablets having 'Android' or 'iPad' in their user agent.

    // console.log(window.innerWidth)
    if(window.innerWidth > 769 && isSmartphone){
        isSmartphone = !isSmartphone
    }
    // if(wind)
    // Output the result
    if (isSmartphone) {
        console.log("Connection made from a smartphone");
    } else if (isTablet) {
        console.log("Connection made from a tablet");
    } else {
        console.log("Connection made from a PC");
    }


    //function for clicking on title, not the + button
    let projectTitles = document.querySelectorAll('.proj_title').forEach(elem => {
        elem.addEventListener('click', (e) => {
            let btn = e.target.parentNode.previousSibling.previousSibling
            let panel = e.target.parentNode.parentNode
            // console.log(e.target.parentNode.previousSibling.previousSibling)
            if (btn.classList.contains('activ_panel_btn')) {
                unfocusPanel(panel, btn)
            } else {
                focusPanel(panel, btn)
            }
        })
    })

    let action_panel_btn = document.querySelectorAll('.action_panel_btn');
    action_panel_btn.forEach(elem => {
        // console.log(elem)
        elem.addEventListener('click', (e) => {
            let btn = e.target
            let panel = e.target.parentNode

            if (btn.classList.contains('activ_panel_btn')) {
                unfocusPanel(panel, btn)
            } else {
                focusPanel(panel, btn)
            }
        })
    })

    function focusPanel(panel, btn) {
        for (const elem of action_panel_btn) {
            elem.parentNode.style.flexGrow = 1;
            if (isSmartphone) {
                elem.parentNode.style.height = 'calc(34vh - 38px)'
                elem.parentNode.style.border = 'none'
            }
            elem.classList.remove('activ_panel_btn')
            elem.parentNode.classList.remove('activ_panel')
            toggleContent('hide', elem.parentNode)
        }
        if (isSmartphone) {
            scrolltop(panel)
            panel.style.height = '100%'
            panel.style.border = 'solid 4px rgb(137 20 255)'
        } else {
            panel.style.flexGrow = 20
            panel.style.width = '0%'
        }
        panel.classList.add('activ_panel')
        btn.classList.add('activ_panel_btn')
        toggleContent('open', panel)
    }

    function unfocusPanel(panel, btn) {
        if (isSmartphone) {
            panel.style.height = 'calc(34vh - 38px)'
            panel.style.border = 'none'
        } else {
            panel.style.flexGrow = 1
            panel.style.width = '0%'
        }
        panel.classList.remove('activ_panel')
        btn.classList.remove('activ_panel_btn')
        toggleContent('hide', panel)
    }

    function toggleContent(action, panel) {
        let content_container;
        let infos;
        for (const elem of panel.children) {
            if (elem.classList.contains('card_content_container')) {
                content_container = elem
            }
            if (elem.classList.contains('card_infos_container')) {
                infos = elem
            }
        }
        // console.log(infos.children)
        if (action == 'open') {
            content_container.style.display = 'flex'
            infos.style.position = 'relative'
            infos.style.top = '0px'
            if (isSmartphone) {
                panel.style.overflowY = 'scroll'
                content_container.style.width = 'calc(100vw - 8px)'
                infos.style.backdropFilter = 'none'
            } else {
                content_container.style.width = 'calc(100vw - 14.6vw)'
            }
            for (let i = 1; i < infos.children.length; i++) {
                infos.children[i].style.display = 'none'
            }
            // infos.classList.add('transformed_infos')
        } else if (action == 'hide') {
            content_container.style.display = 'none'
            infos.style.position = 'absolute'
            if (isSmartphone) {
                panel.style.overflowY = 'hidden'
                infos.style.backdropFilter = 'blur(4px)'
            } else {
                infos.style.top = '15vh'
            }
            for (let i = 1; i < infos.children.length; i++) {
                infos.children[i].style.display = 'flex'
            }
            // infos.classList.remove('transformed_infos')
        }
    }

    function scrolltop(panel) {
        let main = document.querySelector('#main_container')
        let index = parseInt(panel.getAttribute('name'))
        // console.log(parseInt(panel.getAttribute('name')))
        console.log(panel.getBoundingClientRect())
        console.log(main.scrollTop)
        main.scrollTop += panel.getBoundingClientRect().y - 38
    }

    let imgs = document.querySelectorAll('img')
    imgs.forEach(elem => {
        if(!elem.classList.contains('link_icon')){
            elem.classList.add('imageViews')
            elem.addEventListener('click', (e) => {
                showImgFullscreen(e.target)
            })
        }
    })
    showImgFullscreen()
    function showImgFullscreen(image){
        // console.log(image)
        // console.log(image.naturalHeight / image.naturalWidth)
        // console.log(imgs)

        let imageViewerWrapper = document.createElement('div')
        imageViewerWrapper.style.display = 'flex'
        imageViewerWrapper.style.alignItems = 'center'
        imageViewerWrapper.style.justifyContent = 'center'
        imageViewerWrapper.style.position = 'absolute'
        imageViewerWrapper.style.top = '0px'
        imageViewerWrapper.style.width = '100vw'
        imageViewerWrapper.style.height = '100vh'
        imageViewerWrapper.style.zIndex = '500'
        imageViewerWrapper.style.backgroundColor = 'rgba(255, 160, 255, .4)'
        imageViewerWrapper.style.backdropFilter = 'blur(4px)'

        imageViewerWrapper.addEventListener('click', e => {
            imageViewerWrapper.remove()
        })

        let bigImage = document.createElement('img')
        if(image){
            if(image.naturalHeight / image.naturalWidth > 1){
                bigImage.style.height = '92%'
            } else {
                bigImage.style.width = '86%'
            }
            bigImage.src = image.src
            imageViewerWrapper.appendChild(bigImage)
            document.body.appendChild(imageViewerWrapper)
        }

    }
})