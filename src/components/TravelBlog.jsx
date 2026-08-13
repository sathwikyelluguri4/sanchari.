import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/mockData';

export default function TravelBlog() {
  return (
    <section id="blog" style={{ background: 'white', padding: '90px 0' }}>
      <div className="container-pad">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="section-tag">Travel Stories</div>
            <h2 className="section-heading mb-3">Travel Guides & Stories</h2>
            <p className="section-subheading">
              In-depth guides, real budgets, and local knowledge you won't find anywhere else.
            </p>
          </div>
          <a href="#" className="btn-outline flex-shrink-0">
            <span>View All Articles</span>
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card cursor-pointer group"
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '180px' }}>
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(11,31,51,0.4) 0%, transparent 60%)' }}
                />
                {/* Category */}
                <div className="absolute top-3 left-3">
                  <span className="badge badge-saffron text-xs">{post.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="text-xs" style={{ color: '#94A3B8' }}>{post.date}</span>
                  <span className="text-xs" style={{ color: '#94A3B8' }}>·</span>
                  <div className="flex items-center gap-1" style={{ color: '#94A3B8' }}>
                    <Clock size={11} />
                    <span className="text-xs">{post.readTime}</span>
                  </div>
                </div>

                <h3
                  className="font-bold text-base mb-2 leading-snug"
                  style={{ color: '#0B1F33', lineHeight: 1.4 }}
                >
                  {post.title}
                </h3>

                <p className="text-sm mb-3" style={{ color: '#64748B', lineHeight: 1.6 }}>
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-1 font-semibold text-sm group-hover:gap-2 transition-all" style={{ color: '#1261A0' }}>
                  Read More
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
