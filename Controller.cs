//Department Controller

public JsonResult SetDepartment(string depid)
        {
            var id = int.Parse(depid);
            if (depid != null)
            {
                Session["DepartmentChoice"] = db.Department.SingleOrDefault(x=>x.DepId==id);               
            }     
            return Json(new
                {
                    redirectUrl = Url.Action("Index"),
                    isRedirect = true
                });
        }