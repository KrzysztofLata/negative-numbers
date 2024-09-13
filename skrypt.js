const canvas=document.getElementById("nline");
const ctx=canvas.getContext('2d');
function draw()
{
    var n1=Number(document.getElementById('first_number').value); //n1 1 liczba działania przesłana z dokumentu index
    var n2=Number(document.getElementById('second_number').value); //n2 2. liczba z działania przesłana z dokumentu index
    var d=document.getElementById('dx').value; //znak działania (+/-) z dokumentu index
    if (d=='+') //klauzula w sytuacji dodawnia
    {
        document.getElementById("dx").value=n1+d+n2; //wstawienie uproszczonego dzialania w wylaczone pole form
        if (n1<0) document.getElementById("dx").value+="="+n2+'-'+(-1*n1);//wstawienie w pole jw zasady -x+y=y-x
        var result=n1+n2; //obliczenie wyniku, zmienna result jest przesylana jako argument n2
    }
    if (d=='-') //jak wyzej
    {
        document.getElementById("dx").value=n1+d+n2;
        var result=n1-n2;
    }
    var widt_h=100*(Math.max(n1,result)-Math.min(n1,result)); //obliczenie wielkosci osi liczbowej
    clear_(); //wywolanie funkcji czyszczacej canvas
    ctx.fillRect(0,25,widt_h,5); //rysowanie osi liczbowej, bez jednostek
    points(Math.min(n1,result),Math.max(n1,result),widt_h,d); //wywolanie funkcji zaznaczajacej jedn.
}
function clear_() //funkcja czyszczaca
{
    ctx.clearRect(0,25,canvas.width,canvas.height);
}
function points(n1,n2,w,d)
{
    if(n2-n1>105) //wiecej liczb nie zmiesci sie na canvie na osi liczbowej
    {
        alert("Poza zasięgiem");
        location.reload();
    }
    var npoints=2*(n2-n1+2); //obliczenie liczby jednostek
    var hz=w/npoints;//obliczenie czestotliwosci (nazwa zmiennej od jedn czestotliwozci hz), zageszczenia jednostek
    for (var i=0;i<npoints;i++)//rysowanie jednostek, wraz z liczbami 
    {
        var x=5+i*hz;
        ctx.fillRect(x,25,5,15);
        ctx.font="70px";
        ctx.fillText(-5+i+n1,x,50);
        if(-5+i+n1==n1 && d=='+') //oznaczenie n1 i n2 na niebiesisko i czerwono
        {
            ctx.fillStyle='red';
            ctx.fillRect(x,25,5,5);
            ctx.fillStyle='black';
            var n1_i=i;
        }
        if(-5+i+n1==n1 && d=='-')
            {
                ctx.fillStyle='blue';
                ctx.fillRect(x,25,5,5);
                ctx.fillStyle='black';
                var n1_i=i;
            }
        if(-5+i+n1==n2 && d=='+')
            {
                ctx.fillStyle='blue';
                ctx.fillRect(x,25,5,5);
                ctx.fillStyle='black';
                var n2_i=i;
            }
        else 
        if(-5+i+n1==n2 && d=='-')
            {
                ctx.fillStyle='red';
                ctx.fillRect(x,25,5,5);
                ctx.fillStyle='black';
                var n2_i=i; //n2_i i n1_i liczba iteracji petli for
            }
    }
    anim(n1,n2,hz,n1_i,n2_i,d); //wywolanie funkcji odp za animacje
}
function anim(n1,n2,hz,n1_i,n2_i,d)
{
    if (d=='+' && n2!=n1)
    {
        n1_i+=1; //n1 mniejsza przy dodawaniu posuwa sie do przodu, do wiekszego n2 zaznaczajac wszystko po drodze na czerwono
        ctx.fillStyle='red';
        ctx.fillRect(5+n1_i*hz,25,5,5);
        ctx.fillStyle='black';
        n1+=1;
        
    setTimeout(function(){anim(n1,n2,hz,n1_i,n2_i,d)},1000); //rekurencja
    }
    else if (d=='-' && n2!=n1)
    {
        n2_i-=1; //przy odejmowaniu z wiekszej n2, wartosci wyjsciowej cofamy sie zaznaczajac pola przechodnie na czerowno celem dotarcia do wyniku dzialania
        ctx.fillStyle='red';
        ctx.fillRect(5+n2_i*hz,25,5,5);
        ctx.fillStyle='black';
        n2-=1;
        
    setTimeout(function(){anim(n1,n2,hz,n1_i,n2_i,d)},1000); //rekurencja
    }
}
