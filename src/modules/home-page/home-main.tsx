import Image from "next/image";

const HomeMain = () => {
   return (
      <main className="grid grid-cols-1 gap-4 rounded-xl p-4 text-xl lg:grid-cols-2">
         <section>
            <div className="my-3">
               <h3 className="text-4xl">Welcome in quizzler !</h3>
               <p className="my-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem ipsam cumque nam natus eum commodi, amet aliquam
                  adipisci deleniti repudiandae distinctio expedita quia,
                  dolores labore at voluptates aperiam explicabo qui aut quas
                  alias eius? Voluptatibus amet quo iure consequuntur blanditiis
                  maxime quae numquam minima error corrupti, dolores sequi nulla
                  mollitia eligendi enim itaque magnam dolor laboriosam
                  necessitatibus odio reiciendis deleniti facilis debitis.
                  Magnam incidunt impedit porro repudiandae minus saepe, laborum
                  quae. Quod nisi perferendis autem consectetur mollitia
                  voluptate fugit voluptates praesentium recusandae facere
                  perspiciatis, nobis ratione? Omnis eligendi delectus quos
                  minus, commodi minima soluta nesciunt ut fugit nobis
                  temporibus beatae.
               </p>
            </div>
            <div className="my-3">
               <h3 className="text-3xl">
                  In quizzler you can use such things as:{" "}
               </h3>
               <ul className="my-2 list-inside list-disc">
                  <li>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                     Ab, magni odio explicabo eligendi voluptatem quo
                     repudiandae pariatur, in debitis nemo ullam reprehenderit
                     ea consequuntur? Deserunt placeat mollitia nemo nam sit!
                  </li>
                  <li>
                     Aliqua eiusmod nisi nisi non aute Lorem labore officia
                     voluptate. Anim ex tempor ut quis occaecat non elit velit
                     quis. Incididunt incididunt in reprehenderit labore nulla.
                     Nostrud anim aliqua deserunt culpa eiusmod consequat.
                     Eiusmod fugiat labore dolore ad ullamco. Commodo nulla
                     velit magna nisi tempor amet consectetur fugiat amet aute
                     incididunt.
                  </li>
                  <li>
                     Consequat labore fugiat amet sit enim dolore eu dolore
                     aute. Ut irure amet consequat velit elit quis laboris velit
                     minim aliqua tempor. Consectetur non nulla labore mollit ad
                     adipisicing. Dolor deserunt incididunt sunt et id et.
                     Cupidatat voluptate id est nulla esse occaecat do. Dolore
                     labore dolore magna non sunt officia consectetur culpa
                     occaecat tempor in.
                  </li>
                  <li>
                     Proident ex Lorem dolor labore. Elit commodo dolor
                     cupidatat eiusmod proident non nulla Lorem nisi veniam in
                     nulla. Commodo cupidatat sint ullamco magna velit ea ex
                     reprehenderit voluptate officia. Aliquip laboris dolore
                     cupidatat occaecat nisi cupidatat pariatur exercitation
                     voluptate. Laborum consectetur cupidatat duis nisi
                     exercitation culpa dolor aliqua. Ea anim ea est nisi
                     proident duis minim id est dolor fugiat. Nisi duis labore
                     non dolor et magna et cupidatat nulla labore.
                  </li>
               </ul>
            </div>
         </section>
         <section className="flex flex-col items-center gap-2">
            <Image
               src={"/images/app-photos/app_1.png"}
               alt="Photo showing sections of the profli in the application"
               width={900}
               height={500}
               className="shadow-shadow border-[1px] border-borderContainer shadow-containerShadow"
            />
            <Image
               src={"/images/app-photos/app_2.png"}
               alt="Photo showing sections of the profli in the application"
               width={900}
               height={500}
               className="shadow-shadow border-[1px] border-borderContainer shadow-containerShadow"
            />
         </section>
      </main>
   );
};

export default HomeMain;
