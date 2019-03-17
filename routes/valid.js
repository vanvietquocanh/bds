module.exports = function valid(data){
					var regexCode = /[!@#$%^&*()_+\=\[\]{};':"\\|<>\/?]/;
					var arrName = [
									"nam-hoa-xuan-happy-real",
									"dao-vip-happy-real",
									"hoa-xuan-1a-happy-real",
									"lang-chau-au-1-happy-real",
									"lang-chau-au-2-happy-real",
									"nguyen-tri-phuong-happy-real",
									];
					var arrType = [
									"Đất",
									"Nhà",
									"Biệt Thự",
									"Khác"
									];
			        var valids = [];
			        var regPhoneNumber = /(09|07|08|03|05)+([0-9]{8})\b/g
			        for (var i = 0; i < Object.values(data).length; i++) {
			            if(Object.keys(data)[i]!=="Hướng2"){
			            	if(Object.values(data)[i]===""){
				                valids.push("Vui lòng không để trống "+Object.keys(data)[i])
				            }
			            }
			            if(regexCode.test(Object.values(data)[i])&&Object.values(data)[i].toString().length<=256){
				            valids.push("Vui lòng nhập đúng định dạng của: "+Object.keys(data)[i]+" và nhỏ hơn 256 ký tự")
			            }
			        }
		            if(data["SĐT"]){
		            	if(!(regPhoneNumber.test(data["SĐT"]))){
		            		valids.push("Vui lòng nhập đúng định dạng của: SĐT")
		            	}
		            }
		            if(data["Khu Vực"]){
		            	if(arrName.indexOf(data["Khu Vực"])===-1){
		            		valids.push("Vui lòng nhập đúng định dạng của: Khu Vực")
		            	}
		            }
		            if(data["Loại BDS"]){
		            	if(arrType.indexOf(data["Loại BDS"])===-1){
		            		valids.push("Vui lòng nhập đúng định dạng của: Loại BDS")
		            	}
		            }
		            if(data["Giá"]){
		            	if(isNaN(data["Giá"])){
		            		valids.push("Vui lòng nhập đúng định dạng của: Giá")
		            	}
		            }
		            if(data["Lô số"]){
		            	if(isNaN(data["Lô số"])){
		            		valids.push("Vui lòng nhập đúng định dạng của: Lô số")
		            	}
		            }
			        return valids;
			    }