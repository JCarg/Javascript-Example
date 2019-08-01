function getDepartmentRowInfo(e) {
    e = e || window.event;
    var data = "";
    var target = e.srcElement || e.target;
	//Retrieves Id from Table
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        var cells = target.getElementsByTagName("input");
        data = cells[0].defaultValue;
    }
    if (data === "") {
        var id = parseInt($(".col-lg-4 .btn.get-user").attr('id'), 10);
        data = id;
    }
	//Loads Html to View with ID as parameter 
    $('.company-grid .departments .edit-form ').load("/Departments/Edit/" + data + " .edit", function () {
        $(" .departments .company").hide();
        $(".company-grid .departments .dep.edit").show();
    });
    
    setDepartment(data);
    var stat = document.getElementById("userTable_filter");
    $(".company-grid .user").show();
}
function setDepartment(data) {
    $.ajax({
        type: 'POST',
        url: '/Admin/SetDepartment', // Calling Json Method  
        dataType: 'json',
        data: { 'depid': data },
        success: function () {
           $('.user .col-lg-8 .form ').load("/Admin/Index table", function () {
            showDataTables("userTable");
        });
        $('.user .col-lg-4 .form ').load("/Admin/Create .create");
        },
        error: function (ex) {
            alert('Failed to retrieve departments.' + ex);
        }
    });
}
function showDataTables(id) {
    $("#" + id).DataTable({
        scrollY: false,
        scrollCollapse: false,
        paging: false,
        responsive: true,
        "info": false,
        autoWidth: false,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search..."
        },
        fixedHeader: true,
        fixedColumns: false
    });
    $('.dataTables_wrapper input').addClass('form-control');
}