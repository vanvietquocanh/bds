module.exports = function valid(data){
			        var valids = [];
			        for (var i = 0; i < Object.values(data).length; i++) {
			            if(Object.values(data)[i]===""){
			                valids.push(Object.keys(data)[i])
			            }
			        }
			        return valids;
			    }