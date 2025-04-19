document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const questionsContainer = document.querySelector('.questions-container');
    const toggleAnswersBtn = document.getElementById('toggle-answers');
    const searchInput = document.getElementById('search');
    
    // Verificar si los elementos clave existen
    if (!questionsContainer) {
        console.error('No se encontró el contenedor de preguntas (questions-container).');
        return;
    }
    if (!toggleAnswersBtn) {
        console.error('No se encontró el botón de "toggle-answers".');
        return;
    }
    if (!searchInput) {
        console.error('No se encontró el campo de búsqueda (search).');
        return;
    }
    // Todas las 68 preguntas con respuestas y explicaciones
    const questions = [
        // Preguntas 1-10
        {
            number: 1,
            text: "¿Qué combinan tres componentes para formar un ID de puente?",
            options: ["ID de puerto", "dirección IP", "ID de sistema extendido", "dirección MAC", "prioridad del puente", "costo"],
            answer: ["ID de sistema extendido", "dirección MAC", "prioridad del puente"],
            explanation: "Los tres componentes que se combinan para formar una ID de puente son la prioridad del puente, la ID de sistema extendido y la dirección MAC."
        },
        {
            number: 2,
            text: "¿En qué estado dos un switch aprende las direcciones MAC y el proceso BPDU en una red PVST? (Elija dos).",
            options: ["reenvío", "aprendizaje", "deshabilitado", "escucha", "bloqueo"],
            answer: ["reenvío", "aprendizaje"],
            explanation: "Los switches descubren las direcciones MAC en los estados de puerto de aprendizaje y reenvío. Reciben y procesan las BPDU en los estados de puerto de bloqueo, escucha, aprendizaje y reenvío."
        },
        {
            number: 3,
            text: "Si no hay una prioridad de puente configurada en PVST, ¿cuáles son los criterios que se tienen en cuenta para elegir el puente raíz?",
            options: ["La dirección IP más baja.", "La dirección MAC más baja.", "La dirección MAC más alta.", "La dirección IP más alta."],
            answer: "La dirección MAC más baja.",
            explanation: "Solamente un switch puede ser el puente raíz para una VLAN. El puente raíz es el switch con el menor BID. La prioridad y la dirección MAC determinan el BID. Si no hay una prioridad configurada, todos los switches utilizan la prioridad predeterminada y la elección del puente raíz se hace sobre la base de la dirección MAC más baja."
        },
        {
            number: 4,
            text: "¿Qué dos funciones de diseño de red requieren el protocolo de árbol de expansión (STP) asegurar el correcto funcionamiento de la red? (Elija dos).",
            options: [
                "las rutas estáticas",
                "routing dinámico de estado de link que proporciona las rutas redundantes",
                "implementación de VLAN para contener difusiones",
                "eliminación de puntos únicos de falla con los switches 2 de varias capas",
                "links redundantes entre los switches de capa 2"
            ],
            answer: ["eliminación de puntos únicos de falla con los switches 2 de varias capas", "links redundantes entre los switches de capa 2"],
            explanation: "El protocolo de árbol de expansión (STP) es necesario para garantizar un correcto funcionamiento de la red al diseñar una red con varios switches de capa 2 interconectados o cuando se utilizan enlaces redundantes para eliminar puntos de error únicos entre los switches de capa 2. El routing es una función de capa 3 y no está relacionado con STP. Las VLAN reducen el número de dominios de difusión, pero se relacionan con subredes de capa 3 y no con STP."
        },
        {
            number: 5,
            text: "¿Cuál es el resultado de una tormenta de difusión de capa 2?",
            options: [
                "El nuevo tráfico es descartado por el switch porque no puede ser procesado.",
                "Los routers asumirán el control el reenvío de tramas como los switches están congestionados.",
                "Los pedidos de broadcast ARP se devuelven el host que transmite.",
                "El CSMA/CD hará que cada host continuar transmitiendo tramas."
            ],
            answer: "El nuevo tráfico es descartado por el switch porque no puede ser procesado.",
            explanation: "Cuando la red se satura con tráfico de difusión que hace un bucle entre los switches, todos los switches descartan el tráfico nuevo porque no se puede procesar."
        },
        {
            number: 6,
            text: "Una la característica de árbol de expansión con el tipo de protocolo. No se utilizan todas las opciones.",
            options: [
                "PVST: Implementación de Cisco de IEEE 802.1D",
                "RSTP: Mejora convergente rápida de IEEE 802.1D",
                "MSTP: Estándar IEEE que reduce el número de instancias STP",
                "PVST+: Una evolución de STP que proporciona una convergencia más rápida"
            ],
            answer: [
                "PVST: Implementación de Cisco de IEEE 802.1D",
                "RSTP: Mejora convergente rápida de IEEE 802.1w",
                "MSTP: Estándar IEEE que reduce el número de instancias STP"
            ],
            explanation: "El árbol de expansión múltiple (MST, Multiple Spanning Tree) es la implementación del protocolo MSTP (Multiple Spanning Tree Protocol, protocolo de árbol de expansión múltiple) (IEEE 802.1s) por parte de Cisco."
            ,image: ["img/1.jpg"]
        },
        {
            number: 7,
            text: "Cuando se ejecuta el comando show spanning-tree vlan 33 en un switch, tres puertos se muestran en el estado de reenvío. ¿En qué dos funciones de puerto podrían estas interfaces funcionan mientras está en el estado de reenvío? (Elija dos).",
            options: ["alternativo", "raíz", "designado", "deshabilitado", "bloqueado"],
            answer: ["raíz", "designado"],
            explanation: "La función de cada uno de los tres puertos es la de puerto designado o puerto raíz. Los puertos en estado deshabilitado están administrativamente deshabilitados. Los puertos en estado de bloqueo son puertos alternativos."
        },
        {
            number: 8,
            text: "Un conjunto de switches se está conectando en una topología de LAN. ¿Qué valor de prioridad de Bridge STP pasará lo menos probable para que el switch esté seleccionado como la root?",
            options: ["65535", "4096", "32768", "61440"],
            answer: "61440",
            explanation: "La prioridad del puente STP es un número de dos bytes, pero solo se puede personalizar en incrementos de 4096. Se prefiere el número menor, pero el mayor valor de prioridad que se puede utilizar es 61440."
        },
        {
            number: 9,
            text: "¿Cuál es el propósito del protocolo de árbol de expansión (STP)?",
            options: [
                "crear dominios de colisiones más pequeños",
                "permitir que dispositivos Cisco intercambien actualizaciones de tabla de enrutamiento",
                "prevenir bucles en la Capa 2",
                "prevenir loops de enrutamiento en un router",
                "crear dominios de broadcast más pequeños"
            ],
            answer: "prevenir bucles en la Capa 2",
            explanation: "El protocolo de árbol de expansión (STP) crea una ruta a través de una red de switch para evitar bucles de capa 2."
        },
        {
            number: 10,
            text: "¿Qué protocolo brinda hasta 16 instancias de RSTP, combina varias VLAN con la misma topología física y lógica en una instancia común RSTP, y proporciona soporte para portfast, la protección BPDU, el filtro BPDU, la protección de raíz, y el loop?",
            options: ["PVST+ rápido", "STP", "MST", "PVST+"],
            answer: "MST",
            explanation: "MST es la implementación de Cisco de MSTP, un protocolo estándar de IEEE que proporciona hasta 16 instancias de RSTP y combina varias VLAN con la misma topología física y lógica en una instancia de RSTP común. Cada instancia admite PortFast, protección BPDU, filtro BPDU, protección de raíz y protección de bucle. Los protocolos STP y RSTP presuponen solamente una instancia de árbol de expansión para toda la red enlazada, independientemente de la cantidad de VLAN. PVST+ proporciona una instancia de árbol de expansión 802.1D independiente para cada VLAN configurada en la red."
        },
        
        // Preguntas 11-20
        {
            number: 11,
            text: "¿De qué dos estados de puerto PVST+ se obtienen las direcciones MAC? (Elija dos opciones).",
            options: ["Bloqueo", "Escucha", "Desvío", "Deshabilitado", "Aprendizaje"],
            answer: ["Desvío", "Aprendizaje"],
            explanation: "Los dos estados de puerto PVST+ de donde se obtienen las direcciones MAC que se completan en la tabla de direcciones MAC son el estado de aprendizaje y el estado de desvío."
            
        },
        {
            number: 12,
            text: "¿Cuál es el valor que se utiliza para determinar qué puerto en un puente que no es raíz se convertirá en un puerto raíz en una red STP?",
            options: ["El costo de la ruta", "La dirección MAC más alta de todos los puertos en el switch", "La dirección MAC más baja de todos los puertos en el switch", "El número de revisión VTP"],
            answer: "El costo de la ruta",
            explanation: "STP establece un puerto raíz en todos los puentes que no son raíz. El puerto raíz es la ruta de menor costo desde el puente que no es raíz hasta el puente raíz, que indica la dirección de la mejor ruta hacia el puente raíz. Esto se basa principalmente en el costo de la ruta al puente raíz."
        },
        {
            number: 13,
            text: "Consulte la ilustración. ¿Qué switch será el puente raíz después de que se complete el proceso de elección?",
            options: ["S2", "S4", "S3", "S1"],
            answer: "S2",
            explanation: "El puente raíz se determina mediante la ID de puente más baja, que consiste en el valor de prioridad y la dirección MAC. Debido a que los valores de prioridad de todos los switches son idénticos, la dirección MAC se utiliza para determinar el puente raíz. Dado que el S2 tiene la dirección MAC más baja, el S2 se convierte en el puente raíz."
        },
        {
            number: 14,
            text: "¿Cuáles de las siguientes son dos desventajas de desactivar un árbol de expansión y tener varias rutas a través de la red de switch de capa 2? (Elija dos opciones).",
            options: ["La tabla de direcciones MAC se vuelve inestable.", "Las tramas de difusión se transmiten indefinidamente.", "La seguridad de puertos desactiva todos los puertos que tienen dispositivos conectados.", "El switch actúa como un concentrador.", "La seguridad de puertos se vuelve inestable."],
            answer: ["La tabla de direcciones MAC se vuelve inestable.", "Las tramas de difusión se transmiten indefinidamente."],
            explanation: "El árbol de expansión nunca debe desactivarse. Sin este árbol, la tabla de direcciones MAC se vuelve inestable, las difusiones excesivas pueden incapacitar a clientes de redes e inutilizar switches, y varias copias de tramas de unidifusión pueden enviarse a terminales."
        },
        {
            number: 15,
            text: "Consulte la ilustración. El administrador quiso crear un EtherChannel entre el S1 y los otros dos switches mediante los comandos que se muestran, pero fue fallido. ¿Cuál es el problema?",
            options: ["El tráfico no se puede enviar a dos switches diferentes, sino únicamente a dos diferentes dispositivos como un servidor de con habilitación y un switch.", "El tráfico puede enviarse sólo a dos switches diferentes si EtherChannel se implementa en interfaces Gigabit Ethernet.", "El tráfico puede enviarse sólo a dos switches diferentes si EtherChannel se implementa en los switches de capa 3.", "El tráfico no se puede enviar a dos switches diferentes a través del mismo enlace EtherChannel."],
            answer: "El tráfico no se puede enviar a dos switches diferentes a través del mismo enlace EtherChannel.",
            explanation: "Solo se pueden crear enlaces EtherChannel entre dos switches o entre un servidor con EtherChannel habilitado y un switch. El tráfico no se puede enviar a dos switches diferentes a través del mismo enlace EtherChannel."
            ,image: ["img/2.jpg"]
        },
        {
            number: 16,
            text: "¿Qué afirmación es verdadera con respecto al uso de PAgP para crear EtherChannels?",
            options: ["Aumenta el número de puertos que están participar en árbol.", "Es propiedad de Cisco.", "Asigna que se realice un número par de puertos (2, 4, 6, de etc.) sea utilizado para agregación.", "Requiere que más links físicos que el LACP hace.", "Requiere dúplex completo."],
            answer: "Es propiedad de Cisco.",
            explanation: "PAgP se utiliza para agregar automáticamente varios puertos en un grupo EtherChannel, pero solo funciona entre dispositivos de Cisco. LACP se puede utilizar para el mismo propósito entre dispositivos de Cisco y de otros fabricantes. PAgP debe tener el mismo modo dúplex en ambos extremos y puede utilizar dos puertos o más. La cantidad de puertos depende de la plataforma o el módulo del switch. El algoritmo de árbol de expansión considera al enlace EtherChannel agregado como un puerto."
        },
        {
            number: 17,
            text: "¿Qué son dos requisitos de configuración ser capaz un EtherChannel entre dos switches? (Elija dos).",
            options: ["Todas las interfaces deben trabajar en el mismo modo dúplex.", "Diversas permitidas rangos de VLAN deben existir en cada extremo.", "Las interfaces que son involucrada necesidad de ser contiguas en el switch.", "Todas las interfaces deben asignarse a VLAN diferentes.", "Todas las interfaces deben trabajar en la misma velocidad."],
            answer: ["Todas las interfaces deben trabajar en el mismo modo dúplex.", "Todas las interfaces deben trabajar en la misma velocidad."],
            explanation: "Todas las interfaces en el grupo EtherChannel se deben asignar a la misma VLAN o se deben configurar como enlace troncal. Si el rango permitido de VLAN no es el mismo, las interfaces no forman un EtherChannel, incluso si se encuentran en modo automático o deseado."
        },
        {
            number: 18,
            text: "¿Qué dos parámetros deben coincidir en los puertos de dos switches para crear un EtherChannel PAgP entre los switches? (Elija dos).",
            options: ["Modo PAgP", "Información sobre la VLAN", "ID de puerto", "velocidad", "Dirección MAC"],
            answer: ["Información sobre la VLAN", "velocidad"],
            explanation: "Para crear un EtherChannel, los respectivos puertos en los dos switches deben coincidir en términos de información de velocidad, de dúplex y de VLAN. El modo PAgP debe ser compatible, pero no necesariamente el mismo. La ID de puerto y las direcciones MAC no tienen que coincidir."
        },
        {
            number: 19,
            text: "¿Cuáles de los siguientes son dos métodos de balanceo de carga en la tecnología EtherChannel? (Elija dos).",
            options: ["Puerto de origen a puerto de destino", "La combinación de una dirección IP y MAC de origen con una dirección IP y MAC de destino", "MAC de origen a MAC de destino", "La combinación de una dirección IP y un puerto de origen con una dirección IP y un puerto de destino", "IP de origen a IP de destino"],
            answer: ["IP de origen a IP de destino", "MAC de origen a MAC de destino"],
            explanation: "Según la plataforma de hardware, se pueden implementar uno o más métodos de balanceo de carga. Estos métodos incluyen balanceo de carga de MAC de origen a MAC de destino o balanceo de carga de IP de origen a IP de destino a través de enlaces físicos."
        },
        {
            number: 20,
            text: "¿Qué configuración de configuración del modo permitiría la formación de un enlace EtherChannel entre switches SW1 y SW2 sin el envío de tráfico de negociación?",
            options: ["SW1: passive\nSW2: active", "SW1: on\nel SW2: on", "SW1: auto\nSW2: auto\ntroncal automático habilitadas en ambos switches", "SW1: desirable\nSW2: desirable", "SW1: auto\nSW2: auto\nportfast habilitado en ambos switches"],
            answer: "SW1: on\nel SW2: on",
            explanation: "La palabra clave auto de channel-group habilita PAgP solo si se detecta un dispositivo PAgP del otro lado del enlace. Si se utiliza la palabra clave auto, la única forma de crear un enlace EtherChannel es si el dispositivo conectado en el extremo opuesto está configurado con la palabra clave deseada. Las tecnologías PortFast y de enlace troncal no son relevantes a la hora de formar un enlace EtherChannel. Aunque se puede formar un EtherChannel si ambos lados están configurados en modo deseado, PAgP está activo y los mensajes de PAgP se envían constantemente a través del enlace, lo que disminuye el ancho de banda disponible para el tráfico de usuarios."
        },

        // Preguntas 21-30
        {
            number: 21,
            text: "¿Qué modos bidireccional de grupo pondrían una interfaz en un estado de negociación utilizando PAgP? (Elija dos).",
            options: ["pasiva", "on", "activa", "Deseable", "auto"],
            answer: ["Deseable", "auto"],
            explanation: "Existen tres modos disponibles para configurar una interfaz para PAgP: encendido, deseado y automático. Solo los modos deseado y automático colocan la interfaz en un estado de negociación. Los estados activo y pasivo se utilizan para configurar LACP, no PAgP."
        },
        {
            number: 22,
            text: "Un administrador de red ha configurado un EtherChannel entre dos switches conectados mediante cuatro links de trunk. Si la interfaz física para uno de los links troncales cambia a estado inactivo, ¿qué sucede con el EtherChannel?",
            options: ["El protocolo de árbol de expansión desea realizar la transición de la interfaz física falló en modo de reenvío.", "El EtherChannel permanecerá funcional.", "El protocolo de árbol de expansión recalculará los links troncales restantes.", "El EtherChannel desea la transición a estado inactivo."],
            answer: "El EtherChannel permanecerá funcional.",
            explanation: "EtherChannel ofrece redundancia por medio de agrupar varios enlaces troncales en una conexión lógica. La falla de un link físico en el EtherChannel no creará un cambio en la topología y por lo tanto un cálculo por árbol de expansión es innecesario. Sólo un link físico debe permanecer operativo para que el EtherChannel continuar funcionando."
        },
        {
            number: 23,
            text: "Consulte la ilustración. Un administrador de red está configurando un enlace EtherChannel entre dos switches, SW1 y SW2. Sin embargo, el enlace EtherChannel no se puede establecer. ¿Qué cambio en la configuración corregiría el problema?",
            options: ["Configure el modo SW2 EtherChannel como deseable.", "Configure el modo SW2 EtherChannel en automático.", "Configure el modo SW1 EtherChannel en activado.", "Configure el modo SW2 EtherChannel en activado."],
            answer: "Configure el modo SW2 EtherChannel como deseable.",
            explanation: "El modo EtherChannel debe ser compatible en cada lado para que el enlace funcione. Los tres modos del protocolo PAgP son on, desirable y auto. Los tres modos del protocolo LACP son on, active y passive. Los modos compatibles incluyen on-on, auto-desitable, desitable-desirable, active-passive y active-active. Cualquier otra combinación no formará un enlace EtherChannel."
            ,image: ["img/3.jpg"]
        },
        {
            number: 24,
            text: "¿Qué tecnología es un estándar de protocolo abierto que permite que los switches líen automáticamente puertos físicos en un solo link lógico?",
            options: ["PPP de links múltiples", "DTP", "Protocolo de control de agregación de enlaces (LACP)", "PAgP"],
            answer: "Protocolo de control de agregación de enlaces (LACP)",
            explanation: "El protocolo de control de agregación de enlaces (LACP) está definido en IEEE 802.3ad y es un protocolo de estándar abierto. LACP permite que los switches agrupen automáticamente los puertos de switch en un único enlace lógico para aumentar el ancho de banda. El protocolo de agregación de puertos (PAgP) realiza una función similar, pero es un protocolo exclusivo de Cisco. El protocolo de enlace troncal dinámico (DTP) se utiliza para crear enlaces troncales automática y dinámicamente entre los switches. El protocolo PPP multienlace se usa para equilibrar la carga del tráfico PPP a través de varias interfaces seriales."
        },
        {
            number: 25,
            text: "¿Cuál es uno de los requisitos para configurar un EtherChannel de enlaces troncales entre dos switches?",
            options: ["Las interfaces participantes deben ser físicamente contiguas en un switch.", "Las interfaces participantes deben tener asignado el mismo número de VLAN en ambos switches.", "El rango de VLAN permitido debe ser el mismo en ambos switches.", "Las interfaces participantes deben estar en el mismo módulo en un switch."],
            answer: "El rango de VLAN permitido debe ser el mismo en ambos switches.",
            explanation: "Para habilitar un EtherChannel de enlaces troncales correctamente, el rango de VLAN permitido en todas las interfaces debe coincidir; de lo contrario, el EtherChannel no se puede formar. Las interfaces que participan en un EtherChannel no tienen que ser físicamente contiguas o estar en el mismo módulo. Como el EtherChannel es un enlace troncal, las interfaces participantes se configuran como modo de enlace troncal, no como modo de acceso."
        },
        {
            number: 26,
            text: "¿Cuáles de las siguientes son dos características de EtherChannel? (Elija dos).",
            options: ["El protocolo de árbol de expansión asegura redundancia por las interfaces falladas transición en un EtherChannel a un estado de reenvío.", "Configuración de la interfaz EtherChannel proporciona uniformidad en la configuración de enlaces físicos.", "Las aplicaciones de EtherChannel actualizaron los enlaces físicos para proporcionar mayor ancho de banda.", "El balanceo de carga ocurre entre los links configurados como diferente EtherChannels.", "El protocolo de árbol de expansión vea que los links físicos en un EtherChannel como una conexión lógica."],
            answer: ["Configuración de la interfaz EtherChannel proporciona uniformidad en la configuración de enlaces físicos.", "El protocolo de árbol de expansión vea que los links físicos en un EtherChannel como una conexión lógica."],
            explanation: "La configuración de EtherChannel de una interfaz lógica garantiza que haya coherencia en la configuración de los enlaces físicos en el EtherChannel. El EtherChannel proporciona un mayor ancho de banda mediante la utilización de los puertos de switch existentes sin necesidad de actualizar las interfaces físicas. Los métodos de balanceo de carga se implementan entre los enlaces que forman parte del mismo EtherChannel. Debido a que EtherChannel toma los enlaces físicos agrupados como una única conexión lógica, no es necesario recalcular el árbol de expansión si falla uno de los enlaces físicos agrupados. Si falla una interfaz física, STP no puede realizar la transición de la interfaz que falló al estado de reenvío."
        },
        {
            number: 27,
            text: "Un switch está configurado para ejecutar STP. ¿Cual término describe un campo utilizado para especificar un ID de VLAN?",
            options: ["ID del puerto", "Prioridad del puente", "ID de sistema extendido", "Dirección MAC"],
            answer: "ID de sistema extendido"
        },
        {
            number: 28,
            text: "Consulte la ilustración. ¿Cuáles son los posibles roles de puerto para los puertos A, B, C y D en esta red con el protocolo RSTP habilitado?",
            options: ["Designado, raíz, alternativo, raíz", "Alternativo, raíz, designado, raíz", "Designado, alternativo, raíz, raíz", "Alternativo, designado, raíz, raíz"],
            answer: "Alternativo, designado, raíz, raíz",
            explanation: "Como el S1 es el puente raíz, B es un puerto designado, y C y D son puertos raíz. El RSTP admite un nuevo tipo de puerto, puerto alternativo en estado de descarte, que puede ser el puerto A en esta situación."
            ,image: ["img/4.jpg"]
        },
        {
            number: 29,
            text: "Consulte la ilustración. ¿Qué tecnología de switching permitiría que cada link del switch de capa de acceso fuera agregado para proporcionar un mayor ancho de banda entre cada Switch de capa 2 y el switch de capa 3?",
            options: ["PortFast", "EtherChannel", "Enlaces troncales", "HSRP"],
            answer: "EtherChannel",
            explanation: "PortFast se utiliza para reducir la cantidad de tiempo que le lleva a un puerto el procesamiento del algoritmo de árbol de expansión, de modo que los dispositivos puedan comenzar a enviar datos más pronto. El enlace troncal se puede implementar junto con EtherChannel, pero la mera creación de un enlace troncal no agrega enlaces de switch. HSRP se utiliza para equilibrar la carga de tráfico entre dos conexiones diferentes a dispositivos de capa 3 para la redundancia del gateway predeterminado. A diferencia de EtherChannel, HSRP no agrega enlaces en la capa 2 ni la capa 3."
            ,image: ["img/5.jpg"]
        },
        {
            number: 30,
            text: "Consulte la ilustración. Un administrador quiera formar un EtherChannel entre los dos switches mediante el Port Aggregation Protocol. Si el switch S1 está configurado para estar en modo automático, que el modo debe ser configurado en el S2 para formar el EtherChannel?",
            options: ["off", "on", "deseable", "auto"],
            answer: "deseable",
            explanation: "Un EtherChannel se forma mediante PAgP cuando ambos switches están en modo encendido o cuando uno de ellos está en modo automático o deseado y el otro está en modo deseado."
            ,image: ["img/6.jpg"]
        },

        // Preguntas 31-40
        {
            number: 31,
            text: "Abra la actividad de PT. Realice las tareas en las instrucciones de la actividad y luego responda la pregunta. ¿Qué conjunto de comandos de configuración emitidos en SW1 completará con éxito el enlace EtherChannel entre SW1 y SW2?",
            options: [
                "interface Port-channel 1 no shutdown",
                "interface GigabitEthernet0/1 channel-group 1 mode desirable",
                "interface GigabitEthernet0/2 channel-group 2 mode desirable",
                "interface GigabitEthernet0/1 no shutdown"
            ],
            answer: "interface GigabitEthernet0/1 channel-group 1 mode desirable",
            explanation: "La ejecución del comando show running-configuration en SW1 muestra que a la interfaz GigabitEthernet0/1 le falta el comando channel-group 1 mode desirable , que competirá con la configuración EtherChannel para la interfaz GigabitEthernet0/1 y la interfaz GigabitEthernet0/2."
            ,image: ["img/7.jpg"]
        },
        {
            number: 32,
            text: "Coincida con el protocolo STP con la información correcta. (No se utilizan todas las opciones).",
            options: [
                "PVST: Implementación de Cisco de IEEE 802.1D",
                "RSTP: Mejora convergente rápida de IEEE 802.1D",
                "MSTP: Estándar IEEE que reduce el número de instancias STP",
                "PVST+: Una evolución de STP que proporciona una convergencia más rápida"
            ],
            answer: [
                "PVST: Implementación de Cisco de IEEE 802.1D",
                "RSTP: Mejora convergente rápida de IEEE 802.1w",
                "MSTP: Estándar IEEE que reduce el número de instancias STP"
            ]
            ,image: ["img/8.jpg"]
        },
        {
            number: 33,
            text: "¿Cuál es una de las características del árbol de expansión?",
            options: [
                "Tiene un mecanismo de tiempo de vida (TTL, time to live) que funciona en la capa 2.",
                "Está habilitado de manera predeterminada en los switches de Cisco.",
                "Evita la propagación de las tramas de difusión de capa 2.",
                "Se utiliza para detectar información sobre un dispositivo de Cisco adyacente."
            ],
            answer: "Está habilitado de manera predeterminada en los switches de Cisco.",
            explanation: "El árbol de expansión funciona en la capa 2 en redes basadas en Ethernet y está habilitado de manera predeterminada, pero no tiene un mecanismo de TTL. El árbol de expansión existe porque las tramas de capa 2 no tienen un mecanismo de TTL. Las tramas de capa 2 se siguen difundiendo cuando se habilita el árbol de expansión, pero las tramas solo se pueden transmitir mediante una única ruta a través de la red de capa 2 creada por el árbol de expansión. El Cisco Discovery Protocol (CDP) se utiliza para detectar información sobre un dispositivo de Cisco adyacente."
        },
        {
            number: 34,
            text: "¿Qué estándar del árbol de expansión admite un solo puente raíz de modo que el tráfico de todas las VLAN fluya a través de la misma ruta?",
            options: ["802.1D", "MST", "PVST rápido", "PVST+"],
            answer: "802.1D",
            explanation: "El árbol de expansión múltiple (MST, Multiple Spanning Tree) es la implementación de Cisco del protocolo MSTP (Multiple Spanning Tree Protocol, protocolo de árbol de expansión múltiple), un protocolo estándar del IEEE que proporciona hasta 16 instancias de RSTP. El PVST+ proporciona una instancia del árbol de expansión 802.1D separada para cada VLAN configurada en la red. El 802.1D es el estándar de STP original definido por el IEEE y solo permite un puente raíz para todas las VLAN. El 802.1w, o RSTP, proporciona una convergencia rápida, pero aún usa solo un caso STP para todas las VLAN."
        },
        {
            number: 35,
            text: "La red de una pequeña empresa tiene seis switches de capa 2 interconectados. Actualmente, todos los switches están usando el valor de prioridad de puente predeterminado. ¿Qué valor se puede utilizar para configurar la prioridad de puente de uno de los switches para garantizar que se convierta en el puente raíz en este diseño?",
            options: ["61440", "32768", "34816", "1", "28672"],
            answer: "28672",
            explanation: "El valor de prioridad de puente predeterminado para todos los switches de Cisco es 32768. El rango va de 0 a 61440 y aumenta de a 4096. Por lo tanto, los valores 1 y 34816 no son válidos. La configuración de un switch con el menor valor de 28672 (con el valor de prioridad de puente del resto de los switches sin cambios) permitirá que el switch se convierta en el puente raíz."
        },
        {
            number: 36,
            text: "¿Qué afirmación describe una característica de EtherChannel?",
            options: [
                "Puede agrupar tipos combinados de enlaces Ethernet de 100 Mb/s y 1 Gb/s.",
                "Se obtiene al combinar varios enlaces físicos que se consideran como un enlace entre dos switches.",
                "Consta de varios enlaces paralelos entre un switch y un router.",
                "Puede combinar hasta 4 enlaces físicos como máximo."
            ],
            answer: "Se obtiene al combinar varios enlaces físicos que se consideran como un enlace entre dos switches.",
            explanation: "Un EtherChannel se forma al combinar varios enlaces físicos de Ethernet (del mismo tipo) para que se consideren y se configuren como un enlace lógico. Proporciona un enlace agregado entre dos switches. En la actualidad, cada EtherChannel puede constar de hasta ocho puertos Ethernet configurados de manera compatible."
        },
        {
            number: 37,
            text: "Un administrador de redes está configurado un enlace EtherChannel entre los switches SW1 y SW2 con el comando SW1(config-if-range)# channel-group 1 mode auto . ¿Qué comando debe usarse en el SW2 para habilitar este EtherChannel?",
            options: [
                "SW2(config-if-range)# channel-group 1 mode active",
                "SW2(config-if-range)# channel-group 1 mode desirable",
                "SW2(config-if-range)# channel-group 1 mode passive",
                "SW2(config-if-range)# channel-group 1 mode on"
            ],
            answer: "SW2(config-if-range)# channel-group 1 mode desirable",
            explanation: "Las combinaciones posibles para establecer un EtherChannel entre SW1 y SW2 usando LACP o PAgP son las siguientes:\nPAgP\non on\nauto desirable\ndesirable desirableLACP\non on\nactive active\npassive active\nEl modo EtherChannel elegido en cada lado del EtherChannel debe ser compatible para habilitarlo."
        },
        {
            number: 38,
            text: "¿Qué afirmación describe correctamente un EtherChannel?",
            options: [
                "El EtherChannel funciona sólo en la Capa 2.",
                "EtherChannel puede admitir hasta un máximo de diez enlaces separados.",
                "Un puerto trunk puede ser parte de un agrupamiento de EtherChannel.",
                "El PAgP no puede utilizarse junto con EtherChannel."
            ],
            answer: "Un puerto trunk puede ser parte de un agrupamiento de EtherChannel.",
            explanation: "Se pueden agrupar hasta 16 enlaces en un EtherChannel con el PAgP o protocolo LACP. EtherChannel se puede configurar como un grupo de capa 2 o grupo de capa 3. La configuración de un grupo de capa 3 excede el alcance de este curso. Si un puerto de enlace troncal es una parte del grupo de EtherChannel, todos los puertos del grupo deben ser puertos troncales y la VLAN nativa debe ser la misma en todos estos puertos. Una de las mejores prácticas es aplicar la configuración a la interfaz de canal de puertos. Luego, la configuración se aplica automáticamente a los puertos individuales."
        },
        {
            number: 39,
            text: "¿Cuál es la función del STP en una red escalable?",
            options: [
                "Disminuye el tamaño del dominio de fallas para contener el impacto de las fallas.",
                "Deshabilita las rutas redundantes para eliminar bucles de capa 2.",
                "Protege el perímetro de la red empresarial contra actividad maliciosa.",
                "Combina varios enlaces troncales de switches para que actúen como un enlace lógico para un mayor ancho de banda."
            ],
            answer: "Deshabilita las rutas redundantes para eliminar bucles de capa 2.",
            explanation: "El STP es un componente importante de una red escalable porque permite la implementación de conexiones físicas redundantes entre los dispositivos de capa 2 sin crear bucles de capa 2. El STP evita que se formen bucles de capa 2 al deshabilitar las interfaces de los dispositivos de capa 2 en los casos en que crearían un bucle."
        },
        {
            number: 40,
            text: "¿Qué perfil de puerto se asigna al puerto de switch con el costo más bajo para alcanzar el Bridge raíz?",
            options: ["Puerto designado", "Puerto raíz", "Puerto deshabilitado", "Puerto no designado"],
            answer: "Puerto raíz",
            explanation: "El puerto raíz en un switch es el puerto de menor costo para alcanzar el puente raíz."
        },
        // Preguntas 41-50
        {
            number: 41,
            text: "Consulte la ilustración. Según el resultado que se muestra, ¿qué se puede determinar sobre el grupo EtherChannel?",
            options: [
                "Para negociar el enlace EtherChannel, se utilizó un protocolo exclusivo de Cisco.",
                "El grupo EtherChannel no funciona.",
                "El grupo EtherChannel funciona tanto en la capa 2 como en la capa 3.",
                "Se utilizan dos puertos Gigabit Ethernet para formar el EtherChannel."
            ],
            answer: "Para negociar el enlace EtherChannel, se utilizó un protocolo exclusivo de Cisco.",
            explanation: "Es posible utilizar dos protocolos para enviar tramas de negociación que sirven para intentar establecer un enlace EtherChannel: PAgP y LACP. PAgP es propiedad de Cisco, y cumple el estándar del sector."
            ,image: ["img/9.jpg"]
        },
        {
            number: 42,
            text: "Consulte la ilustración. un EtherChannel fue configurado entre los switches S1 y S2, pero las interfaces no forman un EtherChannel. ¿Cuál es el problema?",
            options: [
                "Los puertos de switch tienen que ser configurados como puertos de acceso con cada puerto que hace asignar una VLAN.",
                "El número de interface port -channel tiene que ser diferente en cada switch.",
                "Los puertos del switch no fueron configuradas con el modo velocidad y dúplex.",
                "El EtherChannel no fue configurado con el mismo rango permitido de VLAN en cada interfaz."
            ],
            answer: "El EtherChannel no fue configurado con el mismo rango permitido de VLAN en cada interfaz.",
            explanation: "Las pautas para configurar un enlace EtherChannel son las siguientes:\nLas interfaces que conforman un EtherChannel pueden ser no contiguas físicamente y pueden estar en diferentes módulos.\nLas interfaces en un EtherChannel deben funcionar a la misma velocidad y en el mismo modo dúplex.\nLas interfaces en el EtherChannel deben estar asignadas a la misma VLAN o estar configuradas como enlace troncal.\nLas interfaces en el EtherChannel tienen que admitir el mismo rango permitido de VLAN."
            ,image: ["img/10.jpg"]
        },
        {
            number: 43,
            text: "Consulte la ilustración. Un administrador de redes ejecutó el comando show etherchannel summary en el switch S1. ¿Qué conclusiones se pueden sacar?",
            options: [
                "Los puertos Fa0/1, Fa0/2 y Fa0/3 de FastEthernet no se unen a EtherChannel.",
                "El protocolo de agregación de puertos PAgP está configurado incorrectamente.",
                "EtherChannel no funciona.",
                "EtherChannel está suspendido."
            ],
            answer: "EtherChannel no funciona.",
            explanation: "El estado de EtherChannel se muestra como (SD), lo que significa que se trata de un EtherChannel de capa 2 con un estado D o desactivado. Como el EtherChannel está desactivado, el estado de las interfaces en el grupo de canales es independiente. El PAgP está configurado en el S1, pero no hay indicios de que esté configurado correctamente en el S1 o no. El problema también podría ser la configuración de EtherChannel del switch adyacente."
            ,image: ["img/11.jpg"]
        },
        {
            number: 44,
            text: "¿Cuando se configura el EtherChannel, que el modo forzará una interfaz en un canal de puerto sin cambiar de paquetes del protocolo de agregación?",
            options: ["activa", "on", "Deseable", "auto"],
            answer: "on",
            explanation: "Tanto en el caso de LACP como de PAgP, en el modo “encendido” se fuerza una interfaz en un EtherChannel sin intercambiar paquetes de protocolo."
        },
        {
            number: 45,
            text: "Un administrador de redes configuró un enlace EtherChannel con tres interfaces entre dos switches. ¿Cuál es el resultado si una de las tres interfaces se desactiva?",
            options: [
                "Las otras dos interfaces se convierten en enlaces separados entre los dos switches.",
                "Una interfaz se convierte en un enlace activo para el tráfico de datos y la otra se convierte en un enlace de respaldo.",
                "Las otras dos interfaces continúan con el equilibrio de carga de tráfico.",
                "El EtherChannel falla."
            ],
            answer: "Las otras dos interfaces continúan con el equilibrio de carga de tráfico.",
            explanation: "EtherChannel crea una agregación que se ve como un único enlace lógico. Proporciona redundancia debido a que el enlace general es una conexión lógica. La pérdida de un enlace físico en el canal no crea un cambio en la topología; el EtherChannel sigue siendo funcional."
        },
        {
            number: 46,
            text: "Un switch está configurado para ejecutar STP. ¿Qué término describe el puerto del switch más cercano, en términos de costo total, al puente raíz?",
            options: ["deshabilitado", "puerto raíz", "puerto alternativo", "puerto designado"],
            answer: "puerto raíz"
        },
        {
            number: 47,
            text: "Un switch está configurado para ejecutar STP. ¿Qué término describe un campo que tiene un valor predeterminado de 32.768 y es el factor decisivo inicial al elegir un puente raíz?",
            options: ["Prioridad del puente", "Dirección MAC", "ID de puente", "ID de sistema extendido"],
            answer: "Prioridad del puente"
        },
        {
            number: 48,
            text: "Consulte la ilustración. Un administrador de red está configurando un enlace EtherChannel entre dos switches, SW1 y SW2. ¿Qué instrucción describe el efecto después de que se emiten los comandos en SW1 y SW2?",
            options: [
                "El EtherChannel no logra establecer.",
                "El EtherChannel se establece sin negociación.",
                "El EtherChannel se establece después de que SW1 inicie la solicitud de enlace.",
                "El EtherChannel se establece después de que SW2 inicie la solicitud de enlace."
            ],
            answer: "El EtherChannel no logra establecer.",
            explanation: "Las interfaces GigabitEthernet 0/1 y GigabitEthernet 0/2 están configuradas «on» para el enlace EtherChannel. Este modo obliga a la interfaz a proporcionar un canal sin PAgP o LACP. El EtherChannel se establecerá solamente si el otro lado también se define como «encendido». Sin embargo, el modo en el lado SW2 se establece en PAgP desirable. Por lo tanto, el enlace EtherChannel no será establecido."
            ,image: ["img/12.jpg"]
        },
        {
            number: 49,
            text: "¿Cuáles son dos ventajas de usar LACP? (Escoja dos opciones).",
            options: [
                "Disminuye la cantidad de configuración que se necesita en un switch.",
                "Elimina la necesidad de configurar interfaces troncales al implementar VLAN en varios switches.",
                "Permite a los switches conectados directamente negociar un enlace EtherChannel.",
                "Permite el uso de dispositivos multivendor.",
                "LACP permite que las interfaces Fast Ethernet y Gigabit Ethernet se mezclen dentro de un único EtherChannel.",
                "Proporciona un entorno simulado para probar la agregación de enlaces."
            ],
            answer: ["Permite a los switches conectados directamente negociar un enlace EtherChannel.", "Permite el uso de dispositivos multivendor."],
            explanation: "El Protocolo Link Aggregation Control (LACP) permite a los switches de varios proveedores conectados directamente negociar un enlace EtherChannel. LACP ayuda a crear el enlace EtherChannel al detectar la configuración de cada lado y al asegurarse de que sean compatibles, de modo que se pueda habilitar el enlace EtherChannel cuando sea necesario."
        },
        {
            number: 50,
            text: "Un switch está configurado para ejecutar STP. ¿Cual término describe un puerto-no-raíz que tiene permitido reenviar tráfico a la red?",
            options: ["puerto alternativo", "puerto raíz", "puerto designado", "deshabilitado"],
            answer: "puerto designado"
        },
        {
            number: 51,
            text: "Un switch está configurado para ejecutar STP. ¿Cual término describe el punto de referencia para todos los cálculos de ruta?",
            options: ["puerto designado", "deshabilitado", "puerto raíz", "puente raíz"],
            answer: "puente raíz"
        },
        //50-60
        
            ];
     // Función para aleatorizar un array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
 // Función para renderizar preguntas
 const renderQuestions = (questionsToRender) => {
    questionsContainer.innerHTML = '';

    if (questionsToRender.length === 0) {
        questionsContainer.innerHTML = '<p class="no-results">No se encontraron preguntas que coincidan con tu búsqueda.</p>';
        return;
    }

    questionsToRender.forEach(question => {
        const questionEl = document.createElement('div');
        questionEl.className = 'question';
        questionEl.dataset.number = question.number;

        const optionsHtml = question.options.map((option, index) => `
            <div class="option">
                <input type="${Array.isArray(question.answer) ? 'checkbox' : 'radio'}" 
                       name="question-${question.number}" 
                       id="q${question.number}-opt${index}" 
                       value="${option}">
                <label for="q${question.number}-opt${index}">${option}</label>
            </div>
        `).join('');
        let imageHtml = '';
if (question.image) {
    if (Array.isArray(question.image)) {
        // Si es un array de imágenes, crea etiquetas <img> para cada una
        imageHtml = question.image.map(imgSrc => `<img src="${imgSrc}" alt="Imagen de la pregunta ${question.number}">`).join('');
    } else {
        // Si es una sola imagen (para compatibilidad con preguntas anteriores)
        imageHtml = `<img src="${question.image}" alt="Imagen de la pregunta ${question.number}">`;
    }
}

        questionEl.innerHTML = `
            <div class="question-header">
                <span class="question-number">Pregunta ${question.number}</span>
                <span class="question-status hidden"></span>
            </div>
            <div class="question-text">${question.text}</div>
            ${imageHtml}
            <div class="options">${optionsHtml}</div>
            <div class="question-footer">
                <button class="show-answer" data-question="${question.number}">
                    Mostrar Respuesta
                </button>
                <div class="answer hidden" id="answer-${question.number}">
                    <div class="answer-content">
                        <strong>Respuesta:</strong> 
                        ${Array.isArray(question.answer) ? question.answer.join(', ') : question.answer}
                    </div>
                    <div class="explanation">
                        <strong>Explicación:</strong> ${question.explanation}
                    </div>
                </div>
            </div>
        `;

        questionsContainer.appendChild(questionEl);
    });
};

// Event Delegation para manejar clics en respuestas
questionsContainer.addEventListener('click', (e) => {
    // Manejar botones de mostrar respuesta
    if (e.target.classList.contains('show-answer')) {
        const button = e.target;
        const questionNum = button.dataset.question;
        const answerEl = document.getElementById(`answer-${questionNum}`);

        answerEl.classList.toggle('hidden');
        button.textContent = answerEl.classList.contains('hidden')
            ? 'Mostrar Respuesta'
            : 'Ocultar Respuesta';
    }


        // Manejar selección de opciones
        if (e.target.tagName === 'INPUT') {
            const questionEl = e.target.closest('.question');
            const questionNum = questionEl.dataset.number;
            const question = questions.find(q => q.number === parseInt(questionNum));

            // Lógica de validación (ya la tenías)
            let isCorrect;
            if (Array.isArray(question.answer)) {
                const selectedOptions = Array.from(questionEl.querySelectorAll('input:checked')).map(input => input.value);
                isCorrect = selectedOptions.length === question.answer.length && selectedOptions.every(option => question.answer.includes(option));
            } else {
                const selectedOption = e.target.value;
                isCorrect = selectedOption === question.answer;
            }

            // Mostrar retroalimentación (Correcto/Incorrecto)
            const statusEl = questionEl.querySelector('.question-status');
            statusEl.textContent = isCorrect ? 'Correcto' : 'Incorrecto';
            statusEl.classList.remove('hidden');

            // Mostrar la explicación
            const answerEl = document.getElementById(`answer-${questionNum}`);
            console.log('Elemento answer:', answerEl); // Verifica el elemento
            if (answerEl) {
                console.log('Mostrando explicación'); // Verifica si se ejecuta esta línea
                console.log('Contenido de answer-content:', answerEl.querySelector('.answer-content').textContent); // Verifica el contenido
                console.log('Contenido de explanation:', answerEl.querySelector('.explanation').textContent); // Verifica el contenido

                answerEl.classList.remove('hidden');
                questionEl.querySelector('.show-answer').textContent = 'Ocultar Respuesta';

                // Intenta forzar una actualización del DOM
                setTimeout(() => {
                    answerEl.style.display = 'block'; // Asegura que se muestre
                }, 100);
            } else {
                console.log('Elemento answer no encontrado'); // Verifica si se ejecuta esta línea
            }
        }
    });


// Función de búsqueda
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
    const filteredQuestions = searchTerm
        ? questions.filter(question =>
            question.text.toLowerCase().includes(searchTerm) ||
            (question.explanation || '').toLowerCase().includes(searchTerm) || // Corrección aquí
            question.options.some(opt => opt.toLowerCase().includes(searchTerm)) ||
            question.number.toString().includes(searchTerm)
        )
        : questions;

    renderQuestions(filteredQuestions);
});

// Control para mostrar/ocultar todas las respuestas
toggleAnswersBtn.addEventListener('click', function() {
    const allAnswers = document.querySelectorAll('.answer');
    const isHidden = allAnswers.length > 0
        ? allAnswers[0].classList.contains('hidden')
        : true;

    allAnswers.forEach(answer => answer.classList.toggle('hidden', !isHidden));

    document.querySelectorAll('.show-answer').forEach(button => {
        button.textContent = isHidden ? 'Ocultar Respuesta' : 'Mostrar Respuesta';
    });

    this.textContent = isHidden ? 'Ocultar Todas las Respuestas' : 'Mostrar Todas las Respuestas';
});
// Inicialización: Aleatorizar las preguntas antes de renderizarlas
const shuffledQuestions = shuffleArray([...questions]);
renderQuestions(shuffledQuestions);
// Inicialización

});