module.exports = function valid(data){
			        var valids = [];
			        console.log(Object.values(data));
			        for (var i = 0; i < Object.values(data).length; i++) {
			            if(Object.keys(data)[i]!=="Hướng2"){
			            	if(Object.values(data)[i]===""){
				                valids.push(Object.keys(data)[i])
				            }
			            }
			        }
			        return valids;
			    }