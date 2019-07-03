import React from "react";
import Adv from "./Adv";

class AdvList extends React.Component {
  render() {
    console.log(localStorage);
    const hardCode = [
      {
        title: "Продам собаку Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor, erat et volutpat gravida, enim lacus mollis nunc, ut vestibulum felis metus id elit. Proin id odio mauris. Suspendisse viverra auctor interdum. Duis egestas non est in tristique. Nam porta ac sapien at varius. Quisque rutrum vulputate tellus. Quisque rhoncus diam et nibh tempor volutpat. In sodales lacinia ex, ut tincidunt enim auctor eu. Nunc vitae bibendum massa, eget faucibus ante. Mauris facilisis facilisis risus eget aliquam. Suspendisse at porta elit. Sed viverra ipsum eu molestie tristique. Integer fringilla massa ac fringilla egestas. Pellentesque eget quam non metus pulvinar vulputate sit amet in nisl.Donec fringilla mi vel tellus viverra blandit. Morbi consequat lacinia ornare. Sed eros magna, tincidunt vel neque id, luctus congue lorem. Aenean urna velit, hendrerit dictum lectus ac, egestas aliquet orci.",
        description: "Хороший друг Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus lacus velit, sit amet hendrerit erat venenatis sit amet. Donec sagittis, nibh ut ultricies eleifend, quam nisi dignissim metus, ac vestibulum tellus leo sed lacus. Sed id posuere eros, eu dignissim libero. Mauris luctus sem vitae pretium ultrices. Nullam vitae facilisis leo. Nulla vitae nulla molestie, varius tortor quis, blandit urna. Curabitur ut lacinia neque. Pellentesque consequat dapibus diam vitae condimentum. Duis maximus purus et scelerisque rutrum. Fusce aliquet venenatis orci a dapibus. Vestibulum tempus justo eros, a gravida orci porttitor eleifend. Ut tincidunt ex sit amet libero hendrerit, a interdum erat vulputate.Donec at luctus metus. Integer at massa bibendum, tempor libero sit amet, accumsan massa. Phasellus quis arcu augue. Nunc ac ultrices massa. Nam arcu quam, rutrum vitae condimentum id, ultricies eu est. Sed a massa eu urna venenatis facilisis. Nulla tincidunt risus ut ante ullamcorper, et laoreet massa iaculis. Cras neque justo, lobortis eget rutrum in, sodales a sem. Ut metus dolor, pharetra a diam vitae, imperdiet interdum lacus. Praesent id sem feugiat, pellentesque purus non, porta ex. Nam mauris metus, condimentum et sodales quis, laoreet at augue. Vestibulum sed diam a neque commodo rhoncus. Nam ullamcorper ipsum ut nisi aliquet, sit amet ultricies nibh iaculis. Cras consectetur luctus urna in fermentum. Mauris sollicitudin sollicitudin condimentum. Nunc quis pharetra tortor. Fusce fermentum sed felis vitae fermentum. Donec fringilla massa vitae pharetra iaculis. Praesent ut metus et nisl rutrum interdum et vestibulum velit. Nam vel nisl in mauris dignissim volutpat quis ac massa. In posuere augue a enim malesuada, vel euismod sem pellentesque. Fusce efficitur lacinia libero a eleifend. Fusce eget lacus eget erat bibendum ullamcorper. Donec luctus vulputate nulla. Curabitur cursus aliquet nibh, id pulvinar libero sollicitudin nec. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean quis dui at lectus fermentum dapibus. Proin sem sapien, ultrices a luctus at, tempus id lorem. Duis quis dui turpis. Donec vitae posuere ligula. Fusce ultricies mi a nisl aliquet ultricies eget in nibh. Curabitur sagittis ex vitae massa pulvinar, vel pulvinar purus eleifend. Duis at pellentesque velit. Sed congue risus ut leo commodo scelerisque. Morbi fermentum turpis in tortor semper commodo. Curabitur congue quam quis ipsum varius, at aliquam mauris varius. Etiam ultricies lorem nulla, lobortis maximus purus tristique ac. Interdum et malesuada fames ac ante ipsum primis in.",
        phone: "89994759670",
        city: "Moscow",
        src:
          "https://cdn21.img.ria.ru/images/154960/82/1549608248_0:93:433:337_600x0_80_0_0_27e0eb5c66dad54fb001392a98f8a4b2.jpg"
      },
      {
        title: "Продам кошку Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget arcu interdum tortor porttitor ullamcorper non sit amet nibh. Aliquam fringilla lobortis dictum. Quisque sodales dapibus mauris, non blandit magna blandit vitae. Duis ac augue rutrum, efficitur nunc vehicula, consequat mi. Quisque accumsan sodales efficitur. Nam massa odio, vehicula a erat id, porta aliquam dolor. Vivamus vehicula ultrices justo at aliquet.Vivamus tempor finibus congue. Nam tempor est non lorem semper aliquam. Morbi ultricies lectus vitae lacinia condimentum. Praesent tincidunt erat leo, sit amet elementum urna tristique id. Etiam velit velit, semper nec nibh ac, aliquam blandit magna. Praesent in diam lacus. Aliquam arcu dui, bibendum at interdum sollicitudin, euismod ullamcorper justo. Morbi in venenatis odio. In id neque scelerisque, pulvinar nunc non, porttitor enim. Vestibulum tristique turpis libero, quis finibus leo maximus ut.",
        description: "Питомец Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex lacus, fermentum eu leo in, dapibus eleifend nisi. In hac habitasse platea dictumst. Proin quis vestibulum felis. Donec ut mauris hendrerit, auctor risus ac, vestibulum dolor. Maecenas vel velit sed massa convallis luctus. Vivamus eu nulla ex. Aliquam est nisl, maximus eu tristique non, venenatis a sapien. Vivamus tincidunt purus nec massa volutpat, at condimentum metus semper. Vivamus viverra nunc diam, in laoreet neque vestibulum id. Mauris sollicitudin aliquam nunc, id placerat nulla lacinia nec. Nam eget mattis lectus. Nullam nec tellus eget nisl semper tempor ac vitae nunc. Quisque at viverra orci.Integer scelerisque et ex eget ultrices. Nullam egestas vestibulum odio, sed vestibulum magna bibendum et. Quisque luctus, eros et interdum mollis, metus justo facilisis augue, at facilisis diam nulla ut neque. Praesent condimentum interdum ipsum, laoreet gravida sapien ullamcorper nec. Donec rutrum congue dui. Pellentesque eu massa massa. Sed pretium odio sit amet rutrum consequat. Sed fermentum malesuada nulla eu vestibulum. Nulla egestas fringilla velit, vel ultrices enim commodo at. Nam auctor pharetra quam, eget ullamcorper ligula tempus id. Fusce non maximus urna. Nullam laoreet eleifend felis vel lacinia. Duis facilisis ex non enim euismod tempor. Aenean quis vestibulum ex, a dictum lectus. Aenean iaculis lectus a est aliquam vulputate. Etiam mollis nisi in sollicitudin faucibus. Proin eu ex dui. Aliquam vitae justo id risus semper ullamcorper. Morbi vehicula, justo et cursus rhoncus, justo neque auctor velit, vitae pulvinar massa enim nec dolor. Ut in nulla et neque laoreet vestibulum iaculis a ex. Aenean quis dictum dolor, non tincidunt lacus.Suspendisse sit amet purus sapien. Quisque lobortis nulla lorem, nec venenatis elit porttitor ut. Nulla efficitur venenatis lacus, in pharetra arcu cursus nec. Maecenas at odio augue. Morbi bibendum odio id ullamcorper consectetur. Nulla ac enim felis. Integer vitae sollicitudin mauris. Curabitur varius rhoncus felis. Donec cursus dignissim imperdiet. In justo ex, euismod tempor elementum vitae, ornare eget magna. Quisque non pretium orci, eget aliquet turpis. Ut sollicitudin vehicula eros, ac sodales enim porta id.Pellentesque nisl risus, viverra nec posuere vitae, scelerisque at tellus. In augue nulla, sodales a arcu sit amet, cursus ornare arcu. Nullam vitae eleifend risus. Nam gravida facilisis nulla, nec eleifend odio consectetur a. Donec vehicula, turpis sed hendrerit luctus, leo turpis volutpat urna, vel vestibulum ex felis eu justo. Praesent sit amet suscipit ex, eget pretium.",
        phone: "89804759673",
        city: "Москва",
        src: "https://i.ytimg.com/vi/ElRfLW-NSjE/maxresdefault.jpg"
      }
    ];
    return (
      <div>
        <h1>Объявление</h1>
        {hardCode &&
          hardCode.map(ad => {
            return (
              <Adv
                key={ad.title}
                title={ad.title}
                description={ad.description}
                phone={ad.phone}
                city={ad.city}
                src={ad.src}
              />
            );
          })}
        {/* <Adv
          title={"Продам собаку"}
          description={"Хороший друг"}
          phone={"89994759670"}
          city={"Moscow"}
          src={
            }
        />
        <Adv
          title={"Продам кошку"}
          description={"Питомец"}
          phone={"89804759673"}
          city={"Москва"}
          src={
          } 
        /> */}
      </div>
    );
  }
}

export default AdvList;
