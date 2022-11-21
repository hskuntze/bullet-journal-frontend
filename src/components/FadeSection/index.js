import { useEffect, useRef, useState } from "react";
import "./styles.css";

const FadeSection = (props) => {
  const [isVisible, setIsVisible] = useState(false); //Indica se a seção está visível
  const domRef = useRef(); //Cria referência para os nodos do DOM

  useEffect(() => {
    /**
     * 1º Cria-se uma instância do IntersectionObserver com um callback
     * que será executado toda vez que um elemento do DOM registrado pelo
     * observer muda seu status (scroll, zoom, new content). O bind acon-
     * tece em 'observer.observe(domRef.current)'.
     *
     * 2º É preciso remover o "intersection listener" do DOM quando o
     * desmontamos. Para isto a função de retorno do 'useEffect' bas-
     * tará. Isto é necessário pois toda vez que a função callback é
     * executada uma lista de objetos 'entry' é retornada. Como é ne-
     * cessário que executemos a função apenas uma vez podemos assumir
     * que a lista conterá sempre apenas um único elemento.
     */
    const observer = new IntersectionObserver((ets) => {
      ets.forEach((entry) => setIsVisible(entry.isIntersecting));
    });

    observer.observe(domRef.current);
    let curr = domRef.current;
    return () => observer.unobserve(curr);
  }, []);

  return (
    <div
      className={`fade-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
};

export default FadeSection;
