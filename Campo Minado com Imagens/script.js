
var clique = function clicar(evento){
	indice_x=parseInt(this.id.split('_')[1])
	indice_y=parseInt(this.id.split('_')[2])
	if(evento.button == 0){
		resultado = abrirBloco(indice_x, indice_y, true)
		if (!resultado)
			console.log('PERDEU!!')
	}
	else if (evento.button == 2) {
		if (!campo[indice_x][indice_y].aberto)
			campo[indice_x][indice_y].bandeira = !campo[indice_x][indice_y].bandeira
		atualizarImagens(indice_x, indice_y)
	}
}

var x = 30
var y = 16
var bombas = 99
var bandeiras = 0

var campo=new Array(x)

for (var i=0;i<x;i++){
	campo[i]=new Array(y)
}

for (var i=0;i<x;i++){
	for (var j=0;j<y;j++){
		campo[i][j] = new Object()
		campo[i][j].aberto = false
		campo[i][j].bomba = false
		campo[i][j].numero = 0
		campo[i][j].bandeira = false
		campo[i][j].img = document.createElement('img')
		campo[i][j].img.id = ('bloco_'+i.toString()+'_'+j.toString())
		campo[i][j].img.src = 'Imagens/tile_plain.png'
		campo[i][j].img.style.left = (36+i*40).toString()+'px'
		campo[i][j].img.style.top = (138+j*40).toString()+'px'
		campo[i][j].img.className = 'bloco'
		campo[i][j].img.onmousedown = clique
	}
}

i=0
while (i<bombas){
	var num_x = Math.floor(Math.random() * x)
	var num_y = Math.floor(Math.random() * y)
	if (!campo[num_x][num_y].bomba){
		campo[num_x][num_y].bomba=true
		i++
	}
}

for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++){
    	var quant = 0
    	if (! campo[i][j].bomba){
    		if((i < x-1) && (campo[i+1][j].bomba))
    			quant++
    		if((i > 0) && (campo[i-1][j].bomba))
    			quant++
    		if((j < y-1) && (campo[i][j+1].bomba))
    			quant++
    		if((j > 0) && (campo[i][j-1].bomba))
    			quant++
    		if((i < x-1 && j < y-1) && (campo[i+1][j+1].bomba))
    			quant++
    		if((i < x-1 && j > 0) && (campo[i+1][j-1].bomba))
    			quant++
    		if((i > 0 && j < y-1) && (campo[i-1][j+1].bomba))
    			quant++
    		if((i > 0 && j > 0) && (campo[i-1][j-1].bomba))
    			quant++			
    	}
    	campo[i][j].numero=quant
    }
}

function desenharCampo(){
	for (var i=0;i<x;i++){
		for (var j=0;j<y;j++){
			document.body.appendChild(campo[i][j].img)
		}
	}
}

function abrirBloco(indice_x, indice_y, flag){
	if (campo[indice_x][indice_y].bandeira)
		return 1

	if (campo[indice_x][indice_y].aberto && !flag)
		return 1

	if (campo[indice_x][indice_y].bomba)
		return 0

	if (campo[indice_x][indice_y].numero == 0){
		abrir(indice_x, indice_y)
        if (indice_x != x-1 && indice_y != y-1)
            abrirBloco(indice_x+1, indice_y+1, false)
        if (indice_x != x-1 && indice_y != 0)
            abrirBloco(indice_x+1, indice_y-1, false)
        if (indice_x != 0 && indice_y != y-1)
            abrirBloco(indice_x-1, indice_y+1, false)
        if (indice_x != 0 && indice_y != 0)
            abrirBloco(indice_x-1, indice_y-1, false)
        if (indice_y != 0)
            abrirBloco(indice_x, indice_y-1, false)
        if (indice_y != y-1)
            abrirBloco(indice_x, indice_y+1, false)
        if (indice_x != x-1)
            abrirBloco(indice_x+1, indice_y, false)
        if (indice_x != 0)
            abrirBloco(indice_x-1, indice_y, false)
        return 1
    }

	if (campo[indice_x][indice_y].aberto){
		var aux = 1
		if (indice_x != x-1 && indice_y != y-1)
            if (abrirBloco(indice_x+1, indice_y+1, false)==0)
            	aux = 0
        if (indice_x != x-1 && indice_y != 0)
            if (abrirBloco(indice_x+1, indice_y-1, false)==0)
            	aux = 0
        if (indice_x != 0 && indice_y != y-1)
            if (abrirBloco(indice_x-1, indice_y+1, false)==0)
            	aux = 0
        if (indice_x != 0 && indice_y != 0)
            if (abrirBloco(indice_x-1, indice_y-1, false)==0)
            	aux = 0
        if (indice_y != 0)
            if (abrirBloco(indice_x, indice_y-1, false)==0)
            	aux = 0
        if (indice_y != y-1)
            if (abrirBloco(indice_x, indice_y+1, false)==0)
            	aux = 0
        if (indice_x != x-1)
            if (abrirBloco(indice_x+1, indice_y, false)==0)
            	aux = 0
        if (indice_x != 0)
            if (abrirBloco(indice_x-1, indice_y, false)==0)
            	aux = 0
    	return aux
	}

	if (abrir(indice_x, indice_y) == 0 && flag){
        if (indice_x != x-1 && indice_y != y-1)
            abrirBloco(indice_x+1, indice_y+1, true)
        if (indice_x != x-1 && indice_y != 0)
            abrirBloco(indice_x+1, indice_y-1, true)
        if (indice_x != 0 && indice_y != y-1)
            abrirBloco(indice_x-1, indice_y+1, true)
        if (indice_x != 0 && indice_y != 0)
            abrirBloco(indice_x-1, indice_y-1, true)
        if (indice_y != 0)
            abrirBloco(indice_x, indice_y-1, true)
        if (indice_y != y-1)
            abrirBloco(indice_x, indice_y+1, true)
        if (indice_x != x-1)
            abrirBloco(indice_x+1, indice_y, true)
        if (indice_x != 0)
            abrirBloco(indice_x-1, indice_y, true)
        return 1
    }

    return 1
}

function abrir(indice_x, indice_y){
	campo[indice_x][indice_y].aberto=true	
	atualizarImagens(indice_x, indice_y)
	return campo[indice_x][indice_y].numero
}

function atualizarImagens(indice_x, indice_y){
	if (campo[indice_x][indice_y].bandeira)
		campo[indice_x][indice_y].img.src='Imagens/tile_flag.png'
	else if (campo[indice_x][indice_y].aberto)
		campo[indice_x][indice_y].img.src='Imagens/tile_'+campo[indice_x][indice_y].numero.toString()+'.png'
	else
		campo[indice_x][indice_y].img.src='Imagens/tile_plain.png'
}