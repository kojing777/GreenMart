import React from "react";

const Testimonials = () => {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Food Blogger",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
      comment: "The delivery was lightning fast and the food arrived piping hot! Best biryani I've had outside of Hyderabad.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Regular Customer",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200",
      comment: "I order weekly and never had a bad experience. Their pizza is consistently perfect - crispy crust and fresh toppings!",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Nutritionist",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200",
      comment: "Love their healthy meal options! As a nutritionist, I appreciate the detailed nutritional info for each dish.",
      rating: 4
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Chef",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
      comment: "Impressed by the quality of ingredients. The seafood pasta rivals what I make in my restaurant!",
      rating: 5
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-slide-down">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
            Don't just take our word for it - hear from our satisfied food lovers!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full hover:-translate-y-2 animate-card-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center relative mb-8">
                <div className="absolute -top-14 group">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="pt-20 text-center">
                  <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-center mb-6 italic flex-grow hover:scale-[1.03] transition-transform duration-200">
                "{testimonial.comment}"
              </p>
              
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="22"
                    height="22"
                    viewBox="0 0 22 20"
                    className={`transition-all duration-300 hover:scale-125 hover:rotate-12 ${i < testimonial.rating ? "text-orange-500" : "text-gray-300"}`}
                  >
                    <path 
                      d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" 
                      fill="currentColor"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;