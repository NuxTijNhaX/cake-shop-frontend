
export const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    return {
      resource: request[1],
      id: request[2],
      verb: request[3],
      sub: request[4],
    };
};

export const formatCurrency = (price) => (
  new Intl.NumberFormat(
      'vi-VN', 
      { style: 'currency', currency: 'VND' }).format(price)
);

export const reRender = async(component) => {
  document.getElementById("main-container").innerHTML = await component.render();
  await component.after_render();
}