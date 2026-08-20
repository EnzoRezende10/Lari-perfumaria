/* -------------------------------------------------------------
   LARI PERFUMARIA - JAVASCRIPT ACTIONS
   Features: Header scroll, mobile menu, catalog filter, FAQ toggles,
             dynamic product modal & contact form WhatsApp builder
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. HEADER SCROLL EFFECT
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. MOBILE MENU TOGGLE
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const navMenu = document.getElementById('navigation-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggleBtn && navMenu) {
        menuToggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Alterar ícone do botão
            const icon = menuToggleBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
        
        // Fechar menu ao clicar em qualquer link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggleBtn.querySelector('i');
                icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // 3. ACTIVE NAVIGATION LINK HIGHLIGHT ON SCROLL
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // 4. CATALOG SEARCH AND FILTERING
    const searchInput = document.getElementById('catalog-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const gridContainer = document.getElementById('products-grid-container');

    // Elemento para indicar que nenhum perfume foi encontrado
    const noResultsMsg = document.createElement('div');
    noResultsMsg.className = 'no-results-message';
    noResultsMsg.style.textAlign = 'center';
    noResultsMsg.style.padding = '40px';
    noResultsMsg.style.gridColumn = '1 / -1';
    noResultsMsg.style.color = 'var(--color-text-muted)';
    noResultsMsg.style.fontSize = '1.1rem';
    noResultsMsg.innerHTML = '<i class="fa-solid fa-circle-question" style="font-size: 2rem; color: var(--color-primary-dark); margin-bottom: 12px; display: block;"></i> Nenhum perfume encontrado com estes termos. Tente buscar por marcas, categorias ou notas como "baunilha", "doce", "amadeirado".';
    noResultsMsg.style.display = 'none';
    gridContainer.appendChild(noResultsMsg);

    let activeCategory = 'all';
    let searchQuery = '';

    function updateCatalogDisplay() {
        let visibleCount = 0;

        productCards.forEach(card => {
            const categories = card.dataset.category.split(' ');
            const searchTags = card.dataset.tags.toLowerCase();
            
            const matchesCategory = (activeCategory === 'all' || categories.includes(activeCategory));
            const matchesSearch = searchTags.includes(searchQuery.toLowerCase());

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            noResultsMsg.style.display = 'block';
        } else {
            noResultsMsg.style.display = 'none';
        }
    }

    // Evento de Digitação na Busca
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            updateCatalogDisplay();
        });
    }

    // Evento nos botões de Filtro
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe ativa de todos
            filterButtons.forEach(b => b.classList.remove('active'));
            // Adicionar ativa ao clicado
            btn.classList.add('active');
            
            activeCategory = btn.dataset.category;
            updateCatalogDisplay();
        });
    });

    // 5. FAQ ACCORDION
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');
        
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fechar todas as FAQs abertas
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                faq.querySelector('.faq-content').setAttribute('aria-hidden', 'true');
            });
            
            // Se o clicado não estava ativo, abre
            if (!isActive) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                content.setAttribute('aria-hidden', 'false');
            }
        });
    });

    // 6. PRODUCT DETAIL MODAL (QUICK VIEW)
    const modal = document.getElementById('product-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCloseBackdrop = document.getElementById('modal-close-backdrop');
    const modalBodyContent = document.getElementById('modal-body-content');
    const quickViewButtons = document.querySelectorAll('.btn-quick-view');

    // Dados Completos dos Perfumes
    const productsData = {
        athena: {
            image: 'assets/athena.png',
            brand: 'Maison Alhambra',
            title: 'Kit Athena (Perfume + Body Cream)',
            tagline: '“Você por inteiro” - Sinta. Ame. Repita.',
            description: 'O Kit Athena combina o requinte de um Eau de Parfum árabe de altíssima fixação com a suavidade aveludada do creme corporal hidratante. Inspirado em notas florais opulentas e madeiras reconfortantes, foi desenhado para criar um verdadeiro ritual de cuidado diário, deixando uma essência de poder inigualável em sua pele.',
            pyramid: {
                topo: 'Flor de Laranjeira, Jasmim Sambac',
                coracao: 'Baunilha de Madagascar, Mel Silvestre',
                fundo: 'Âmbar Cinzento, Sândalo de Mysore, Musk Branco'
            },
            highlights: [
                'Kit Completo: Fragrância Eau de Parfum + Creme Hidratante Especial',
                'Hidratação Corporal Intensiva de 24 horas',
                'Fragrância Árabe Sofisticada e de Projeção Marcante',
                'Textura Cremosa e Aveludada de rápida absorção'
            ],
            whatsappUrl: 'https://wa.me/5511999999999?text=Ol%C3%A1%20Lari!%20Vi%20o%20Kit%20Athena%20%28Perfume%20%2B%20Creme%20Corporal%29%20da%20Maison%20Alhambra%20no%20site%20e%20gostaria%20de%20garantir%20o%20meu.'
        },
        yara: {
            image: 'assets/yara.jpg',
            brand: 'Lattafa',
            title: 'Yara Eau de Parfum',
            tagline: '“Doçura cremosidade e sedução gourmet.”',
            description: 'O Yara da Lattafa é um dos perfumes árabes femininos mais cobiçados e elogiados do mundo. É uma obra-prima oriental de caráter doce e cremoso, destacando-se pela harmonia entre frutas tropicais suculentas, baunilha suave e o irresistível caramelo de fundo. Excelente para quem adora deixar um rastro doce e marcante.',
            pyramid: {
                topo: 'Heliotrópio Cremosinho, Orquídea Silvestre, Tangerina',
                coracao: 'Flores Tropicais Cativantes, Acorde de Caramelo Lactônico',
                fundo: 'Baunilha Bourbon, Sândalo Quente, Almíscar Aconchegante'
            },
            highlights: [
                'Perfume Árabe 100% Original no Frasco de 100ml',
                'Família Olfativa Gourmet / Oriental Doce de Alta Performance',
                'Projeção Excelente e Fixação Prolongada na Pele',
                'Fenômeno de sucesso nas redes sociais pela embalagem e aroma'
            ],
            whatsappUrl: 'https://wa.me/5511999999999?text=Ol%C3%A1%20Lari!%20Vi%20o%20perfume%20Yara%20Eau%20de%20Parfum%20da%20Lattafa%20no%20site%20e%20gostaria%20de%20garantir%20o%20meu.'
        },
        asad: {
            image: 'assets/asad.png',
            brand: 'Lattafa',
            title: 'Kit Asad (Perfume + Body Cream)',
            tagline: '“Poder que se sente. Presença que fica.”',
            description: 'O Kit Asad representa a realeza oriental masculina. Uma fragrância extremamente encorpada, rica em especiarias quentes, café e tabaco aromático, suavizada pela doçura da baunilha negra de fundo. Este kit inclui o deslumbrante hidratante corporal Asad Body Cream, permitindo prolongar ainda mais a fixação e perfumar de forma imponente.',
            pyramid: {
                topo: 'Pimenta Preta Picante, Abacaxi Doce, Tabaco Aromático',
                coracao: 'Café Expresso, Canela do Ceilão, Patchouli Oriental, Íris',
                fundo: 'Âmbar Preto, Baunilha de Madagascar, Cedro Seco, Labdanum'
            },
            highlights: [
                'Kit de Luxo: Perfume Masculino 100ml + Creme Corporal Hidratante',
                'Fragrância Especiada Quente e Amadeirada Oriental',
                'Fixação Lendária e Projeção que Domina o Ambiente',
                'Embalagem Imperial preta com detalhes dourados'
            ],
            whatsappUrl: 'https://wa.me/5511999999999?text=Ol%C3%A1%20Lari!%20Vi%20o%20Kit%20Asad%20%28Perfume%20%2B%20Creme%20Corporal%29%20da%20Lattafa%20no%20site%20e%20gostaria%20de%20garantir%20o%20meu.'
        },
        manblack: {
            image: 'assets/man-black.jpg',
            brand: 'Maison Alhambra',
            title: 'Man Black Edition Eau de Parfum',
            tagline: '“Elegância terrosa e acordes de mistério.”',
            description: 'O Man Black Edition é uma fragrância masculina robusta, voltada para ocasiões especiais e momentos onde a sofisticação discreta é exigida. Destaca as notas florais secas de violeta e cardamomo misturadas a um fundo úmido e terroso de vetiver, madeiras nobres e couros, gerando um aroma com excelente fixação e classe atemporal.',
            pyramid: {
                topo: 'Cardamomo Fresco, Violeta Seca, Pimenta de Sichuan',
                coracao: 'Couro Nobre, Resinas Balsâmicas, Notas de Terra Úmida',
                fundo: 'Vetiver do Haiti, Cedro do Atlas, Musgo de Carvalho, Âmbar Forte'
            },
            highlights: [
                'Frasco Versátil de 30ml de Excelente custo-benefício',
                'Fragrância Exclusiva Amadeirada e Terrosa de Alta Classe',
                'Ideal para Reuniões Formais, Encontros e Climas Amamenizados',
                'Projeção Elegante que gera elogios respeitosos'
            ],
            whatsappUrl: 'https://wa.me/5511999999999?text=Ol%C3%A1%20Lari!%20Vi%20o%20perfume%20Man%20Black%20Edition%20da%20Maison%20Alhambra%20no%20site%20e%20gostaria%20de%20encomendar%20o%20meu.'
        }
    };

    function openModal(productId) {
        const data = productsData[productId];
        if (!data) return;

        // Gerar itens de destaque (highlights)
        let highlightsHtml = '';
        data.highlights.forEach(hl => {
            highlightsHtml += `<li><i class="fa-solid fa-circle-check"></i> ${hl}</li>`;
        });

        // Preencher conteúdo do modal
        modalBodyContent.innerHTML = `
            <div class="modal-product-layout">
                <div class="modal-product-image-container">
                    <img src="${data.image}" alt="${data.title}" class="modal-product-image">
                </div>
                <div class="modal-product-info">
                    <span class="modal-brand">${data.brand}</span>
                    <h3 class="modal-title" id="modal-title">${data.title}</h3>
                    <p class="modal-tagline">${data.tagline}</p>
                    
                    <p class="modal-description">${data.description}</p>
                    
                    <div class="modal-detail-section">
                        <h4>Notas Olfativas</h4>
                        <div class="modal-notes-grid">
                            <div class="modal-note-box">
                                <span>Topo</span>
                                ${data.pyramid.topo}
                            </div>
                            <div class="modal-note-box">
                                <span>Coração</span>
                                ${data.pyramid.coracao}
                            </div>
                            <div class="modal-note-box">
                                <span>Fundo</span>
                                ${data.pyramid.fundo}
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-detail-section">
                        <h4>Destaques do Produto</h4>
                        <ul class="modal-features-list">
                            ${highlightsHtml}
                        </ul>
                    </div>
                    
                    <div class="modal-actions">
                        <a href="${data.whatsappUrl}" target="_blank" rel="noopener" class="btn-primary modal-btn-order" id="modal-order-btn-${productId}">
                            <i class="fa-brands fa-whatsapp"></i> Falar com a Lari e Garantir o Meu
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Abrir modal com transições
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquear scroll do body
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Habilitar scroll do body
    }

    // Atribuir cliques aos botões de Quick View
    quickViewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = btn.dataset.product;
            openModal(productId);
        });
    });

    // Fechar ao clicar no botão fechar ou no backdrop
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalCloseBackdrop) modalCloseBackdrop.addEventListener('click', closeModal);
    
    // Fechar ao clicar ESC no teclado
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 7. CONTACT FORM TO WHATSAPP REDIRECT
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const message = document.getElementById('form-message').value.trim();
            
            // Construir texto da mensagem
            let text = `Olá Lari! Enviei uma mensagem pelo formulário do site:\n\n`;
            text += `*Nome:* ${name}\n`;
            text += `*WhatsApp:* ${phone}\n`;
            if (message) {
                text += `*Mensagem/Pedido:* ${message}`;
            } else {
                text += `*Mensagem/Pedido:* Quero conhecer o catálogo de perfumes disponíveis!`;
            }
            
            // Encoda URL e redireciona
            const encodedText = encodeURIComponent(text);
            const whatsappLink = `https://wa.me/5511999999999?text=${encodedText}`;
            
            window.open(whatsappLink, '_blank');
        });
    }
});
