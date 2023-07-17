window.addEventListener('load', () => {

    // Get the User-Agent header value
    const userAgent = navigator.userAgent;

    // Define regular expressions for common smartphone user agents
    const smartphoneRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    // Check if the User-Agent matches a smartphone
    const isSmartphone = smartphoneRegex.test(userAgent);

    // Output the result
    if (isSmartphone) {
        console.log("Connection made from a smartphone");
    } else {
        console.log("Connection made from a PC");
    }

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
        foldContent()
        for (const elem of action_panel_btn) {
            elem.parentNode.style.flexGrow = 1;
            elem.classList.remove('activ_panel_btn')
            elem.parentNode.classList.remove('activ_panel')
            toggleContent('hide', elem.parentNode)
        }
        panel.style.flexGrow = 20
        panel.style.width = '0%'
        panel.classList.add('activ_panel')
        btn.classList.add('activ_panel_btn')
        toggleContent('open', panel)
    }

    function unfocusPanel(panel, btn) {
        foldContent()
        panel.style.flexGrow = 1
        panel.style.width = '0%'
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
        // for(let i=0;i<panel.children)
        if (action == 'open') {
            content_container.style.display = 'flex'
            content_container.style.opacity = 1
            infos.classList.add('transformed_infos')
        } else if (action == 'hide') {
            content_container.style.opacity = 0
            infos.classList.remove('transformed_infos')
        }
    }

    function foldContent() {
        let card_content_containers = document.querySelectorAll('.card_content_container')
        for (const elem of card_content_containers) {
            elem.style.display = "none"
        }
    }

})