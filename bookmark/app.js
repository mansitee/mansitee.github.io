var folders = !!localStorage.getItem('sbm_folders') ? JSON.parse(localStorage.getItem('sbm_folders')) : {};
var sites = !!localStorage.getItem('sbm_sites') ? JSON.parse(localStorage.getItem('sbm_sites')) : {};
var folder_card_name = $('#fname')
var bm_list = $('#folder-data-list')
var folder_modal = $('#folderFormModal')
var folder_form = $('#folder-form')

var bookmark_modal = $('#bookmarkFormModal')
var bookmark_form = $('#bookmark-form')
var url_search = location.search
var params = new URLSearchParams(url_search)

function random_key(){
    var key = Math.random().toString(36).slice(2);
    while(true){
        if($(`#${key}`).length > 0){
            key = Math.random().toString(36).slice(2);
        }else{
            return key;
        }
    }
}

function load_folder(){
    bm_list.html('')
    if(params.has('fid')){
        var fid = params.get('fid')
    }else{
        var fid = ''
    }
    var folder = '';
    if(fid == '' || fid =='null' || fid == null){
        folder = 'Root';
        folder_card_name.text(folder)
    }else{
        folder_card_name.text(folders[fid]['name'])
    }
    if(fid != '' && !!folders[fid]['parent']){
        if(folders[fid]['parent'] != 'root')
            $('#back_btn').attr('href', './?fid='+folders[fid]['parent']);
        else
            $('#back_btn').attr('href', './');
        $('#back_btn').removeClass('d-none')
    }
    folders_sorted =  Object.keys(folders).reduce((arr, k) =>{ 
        folders[k]['id'] = k
        arr.push(folders[k])
        return arr;
    }, [])
    .sort((a, b) => { 
        if(a.name > b.name)
        return 1;
        if(a.name < b.name)
        return -1;
        return 0;
     })
    // Object.keys(folders).map(k=>{
        folders_sorted.map(data=>{
        var k = data.id
        if(folder == 'Root'){
            if(!folders[k]['parent'] ||(!!folders[k]['parent'] && folders[k]['parent'] == 'root')){
                var item = $('<div class="d-flex justify-content-between w-100">')
                item.addClass('list-group-item list-group-item-action text-start')
                var anchor = $('<a href="./?fid='+k+'" class="px-4">')
                anchor.addClass('rounded-0 col-auto flex-shrink-1 flex-grow-1 text-decoration-none text-dark')
                anchor.html('<i class="fa fa-folder"></i> '+folders[k]['name'])
                var dropdown = $('<div>')
                dropdown.addClass('dropdown col-auto list-dd')
                dropdown.html(`<a class="text-dark" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="edit('folder','${k}')" href="#">Edit</a></li>
                    <li><a class="dropdown-item" onclick="delete_data('folder','${k}')" href="#">Delete</a></li>
                </ul>`)
                item.append(anchor)
                item.append(dropdown)
                bm_list.append(item)
            }
        }else{
            if(!!folders[k]['parent'] && folders[k]['parent'] == fid){
                var item = $('<div class="d-flex justify-content-between w-100">')
                item.addClass('list-group-item list-group-item-action text-start')
                var anchor = $('<a href="./?fid='+k+'" class="px-4">')
                anchor.addClass('rounded-0 col-auto flex-shrink-1 flex-grow-1 text-decoration-none text-dark')
                anchor.html('<i class="fa fa-folder"></i> '+folders[k]['name'])
                var dropdown = $('<div>')
                dropdown.addClass('dropdown col-auto list-dd')
                dropdown.html(`<a class="text-dark" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="edit('folder','${k}')" href="#">Edit</a></li>
                    <li><a class="dropdown-item" onclick="delete_data('folder','${k}')" href="#">Delete</a></li>
                </ul>`)
                item.append(anchor)
                item.append(dropdown)
                bm_list.append(item)
            }
        }
        
    })
    sites_sorted =  Object.keys(sites).reduce((arr, k) =>{ 
                        sites[k]['id'] = k
                        arr.push(sites[k])
                        return arr;
                    }, [])
                    .sort((a, b) => { 
                        if(a.name > b.name)
                        return 1;
                        if(a.name < b.name)
                        return -1;
                        return 0;
                     })

    // console.log(sites_sorted)
    // Object.keys(sites).map(k=>{
        sites_sorted.map(data=>{
        var k = data.id
        if(folder == 'Root'){
            if(!sites[k]['folder'] ||(!!sites[k]['folder'] && sites[k]['folder'] == 'root')){
                var item = $('<div class="d-flex justify-content-between w-100">')
                item.addClass('list-group-item list-group-item-action text-start')
                var anchor = $('<a href="'+sites[k]['link']+'" target="_blank" class="px-4">')
                anchor.addClass('rounded-0 col-auto flex-shrink-1 flex-grow-1 text-decoration-none text-dark')
                anchor.html('<i class="fa-solid fa-bookmark text-info"></i> '+sites[k]['name'])
                var dropdown = $('<div>')
                dropdown.addClass('dropdown col-auto list-dd')
                dropdown.html(`<a class="text-dark" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="edit('site', '${k}')" href="#">Edit</a></li>
                    <li><a class="dropdown-item" onclick="delete_data('site', '${k}')" href="#">Delete</a></li>
                </ul>`)
                item.append(anchor)
                item.append(dropdown)
                bm_list.append(item)
            }
        }else{
            if(!!sites[k]['folder'] && sites[k]['folder'] == fid){
                var item = $('<div class="d-flex justify-content-between w-100">')
                item.addClass('list-group-item list-group-item-action text-start')
                var anchor = $('<a href="'+sites[k]['link']+'" target="_blank" class="px-4">')
                anchor.addClass('rounded-0 col-auto flex-shrink-1 flex-grow-1 text-decoration-none text-dark')
                anchor.html('<i class="fa-solid fa-bookmark text-info"></i> '+sites[k]['name'])
                var dropdown = $('<div>')
                dropdown.addClass('dropdown col-auto list-dd')
                dropdown.html(`<a class="text-dark" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="edit('site', '${k}')" href="#">Edit</a></li>
                    <li><a class="dropdown-item" onclick="delete_data('site', '${k}')" href="#">Delete</a></li>
                </ul>`)
                item.append(anchor)
                item.append(dropdown)
                bm_list.append(item)
            }
        }
    })
}

function edit($type='',$id=''){
    if($type == 'folder'){
        if(!folders[$id])
        return false;
        console.log(folders[$id])
        folder_form.find('[name="id"]').val($id)
        folder_form.find('[name="folder_name"]').val(folders[$id]['name'])
        if(params.has('fid')){
            var fid = params.get('fid')
        }else{
            var fid = 'root'
        }
        update_parent_options(!!folders[$id]['parent'] ? folders[$id]['parent'] : fid)
        folder_modal.find('.modal-title').text('Edit Folder')
        folder_modal.modal('show')
    }else if($type == 'site'){
        if(!sites[$id])
        return false;
        bookmark_form.find('[name="id"]').val($id)
        bookmark_form.find('[name="bookmark_name"]').val(sites[$id]['name'])
        bookmark_form.find('[name="link"]').val(sites[$id]['link'])
        bookmark_modal.find('.modal-title').text('Edit Bookmark')
        bookmark_modal.modal('show')
    }
}

function delete_data($type='', $id=''){
    if($type == 'folder'){
        if(!folders[$id])
        return false;
        if(confirm(`Are you sure to delete '${folders[$id]['name']}' folder?`) === true){
            delete folders[$id]
            Object.keys(sites).map(k=>{
                if(!!sites[k]['folder'] && sites[k]['folder'] == $id){
                    delete sites[k];
                }
            })
            function delete_child($cid){
                Object.keys(sites).map(ck=>{
                    if(!!sites[ck]['folder'] && sites[ck]['folder'] == $cid){
                        delete sites[ck];
                    }
                })
                Object.keys(folders).map(ck=>{
                    if(!!folders[ck]){
                        if(!!folders[ck]['parent'] && folders[ck]['parent'] == $cid){
                            delete folders[ck];
                            delete_child(ck)
                        }
                    }
                })
            }
            Object.keys(folders).map(k=>{
                if(!!folders[k]){
                    if(!!folders[k]['parent'] && folders[k]['parent'] == $id){
                        delete folders[k];
                        delete_child(k)
                    }
                }
            })
            localStorage.setItem('sbm_folders',JSON.stringify(folders));
            localStorage.setItem('sbm_sites',JSON.stringify(sites));
            alert('Folder has been deleted successfully')
        }
    }else if($type == 'site'){
        if(!sites[$id])
        return false;
        if(confirm(`Are you sure to delete '${sites[$id]['name']}' bookmark?`) === true){
            delete sites[$id]
            localStorage.setItem('sbm_sites',JSON.stringify(sites));
            alert('Folder has been deleted successfully')
        }
    }
    load_folder();
}

function update_parent_options($selected = 'root'){
    $('#parent').html('')
    $('#parent').append('<option value="root" '+($selected == 'root' ? 'selected' : '')+'>Root Folder</option>')
    Object.keys(folders).map(k =>{
        $('#parent').append('<option value="'+(k)+'" '+($selected == k ? 'selected' : '')+'>'+folders[k]['name']+'</option>')
    })
}

$(document).ready(function(){
    load_folder()
    $('#add_new_folder').click(function(){
        folder_modal.find('.modal-title').text("Add New Folder")
        if(params.has('fid')){
            var fid = params.get('fid')
        }else{
            var fid = 'root'
        }
        update_parent_options(fid)
        folder_modal.modal('show')
    })
    folder_modal.on('hide.bs.modal', function(e){
        folder_form[0].reset();
        folder_form.find('input:hidden').val('')
    })
    bookmark_modal.on('hide.bs.modal', function(e){
        bookmark_form[0].reset();
        bookmark_form.find('input:hidden').val('')
    })

    $('#add_new_bookmark').click(function(){
        bookmark_modal.find('.modal-title').text("Add New Bookmark")
        bookmark_modal.modal('show')
    })

    folder_form.submit(function(e){
        e.preventDefault()

        var id = $(this).find('[name="id"]').val()
        var name = $(this).find('[name="folder_name"]').val()
        var parent = $(this).find('[name="parent"]').val()
        if(id == '' || id =='null' || id == null){
            var check = true
            while(check){
                id = random_key()
                if(!folders[id])
                check = false;
            }
        }

        folders[id] = {name:name, parent:parent}
        localStorage.setItem('sbm_folders',JSON.stringify(folders));
        alert('New Folder has been added successfully')
        folder_modal.modal('hide')
        load_folder()
    })

    bookmark_form.submit(function(e){
        e.preventDefault()
        var folder = 'root';
        if(params.has('fid')){
            folder = params.get('fid')
        }

        var id = $(this).find('[name="id"]').val()
        var name = $(this).find('[name="bookmark_name"]').val()
        var link = $(this).find('[name="link"]').val()
        if(id == '' || id =='null' || id == null){
            var check = true
            while(check){
                id = random_key()
                if(!folders[id])
                check = false;
            }
        }

        sites[id] = {name:name, link: link, folder:folder}
        localStorage.setItem('sbm_sites',JSON.stringify(sites));
        alert('New Bookmark has been added successfully')
        bookmark_modal.modal('hide')
        load_folder()
    })
})