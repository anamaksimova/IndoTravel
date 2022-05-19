const fly = document.createElement('div');
fly.style.cssText = `
position:fixed;
right:0;
bottom:0;
width:50px;
height:50px;
pointer-events:none;
background: url("airplane.svg") center/contain no-repeat;
`;


const docEl = document.documentElement;
const calcPositionFly = () => {
  const maxHeight = docEl.clientHeight - fly.clientHeight;
  const maxScroll = docEl.scrollHeight - docEl.clientHeight;
  const percentScroll = (window.pageYOffset * 100) / maxScroll;
  const up = maxHeight * (percentScroll / 100);
  fly.style.transform = `translateY(-${up}px)`;
};
if (window.screen.width > 758) {
  document.body.append(fly);
  window.addEventListener('scroll', calcPositionFly);
  calcPositionFly();
}
