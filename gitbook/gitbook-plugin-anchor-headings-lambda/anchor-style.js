anchors.options = {
    icon: 'λ',
    placement: 'left'
}

gitbook.events.bind('page.change', function(){
    anchors.add('h1,h2,h3')
})
